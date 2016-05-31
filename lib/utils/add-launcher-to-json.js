/* jshint node: true */
'use strict';
var fs = require('fs');

function addToLaunchers(name, list) {
  if (list.indexOf(name) === -1) {
    list.push(name);
  }
}

module.exports = function(fullPath, launcherName, launcher, options) {
  var testemJSON = JSON.parse(fs.readFileSync(fullPath, { encoding: 'utf8' }));

  testemJSON.launchers = testemJSON.launchers || {};
  testemJSON.launchers[launcherName] = launcher;

  if (options.addToCi) {
    addToLaunchers(launcherName, testemJSON.launch_in_ci);
  }

  if (options.addToDev) {
    addToLaunchers(launcherName, testemJSON.launch_in_dev);
  }

  fs.writeFileSync(fullPath, JSON.stringify(testemJSON, null, 2), { encoding: 'utf8' });
};
