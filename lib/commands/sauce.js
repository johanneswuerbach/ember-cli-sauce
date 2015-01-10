/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');

module.exports = {
  name: 'sauce',
  works: 'insideProject',
  description: 'Add a sauce browser into your testem.json',

  availableOptions: [
    { name: 'browser', type: String, default: 'chrome' },
    { name: 'version', type: String },
    { name: 'platform', type: String },
    { name: 'launcher-name', type: String },
    { name: 'add-to-ci', type: Boolean, default: false }
  ],

  run: function(options) {
    var fullPath = path.join(this.project.root, 'testem.json');

    if (!fs.existsSync(fullPath)) {
      return;
    }
    var testemJSON = JSON.parse(fs.readFileSync(fullPath, { encoding: 'utf8' }));

    var args = ['-b', options.browser];
    if (options.version) {
      args.push('-v');
      args.push(options.version);
    }
    if (options.platform) {
      args.push('-p');
      args.push(options.platform);
    }

    args.push('--at'); // Wait until testem finished
    args.push('--no-ct'); // Don't create a seperate tunnel
    args.push('--u'); // Read URL provided by testem

    var laucherName;
    if (options.laucherName) {
      laucherName = options.laucherName;
    }
    else {
      laucherName = [
        'SL',
        options.browser,
        options.version,
        options.platform
      ].filter(function(n) { return !!n; }).join('_');
    }

    testemJSON.launchers = testemJSON.launchers || {};
    testemJSON.launchers[laucherName] = {
      exe: './node_modules/.bin/ember-cli-sauce',
      args: args,
      protocol: 'browser'
    };

    if (options.addToCi && testemJSON.launch_in_ci.indexOf(laucherName) === -1) {
      testemJSON.launch_in_ci.push(laucherName);
    }

    fs.writeFileSync(fullPath, JSON.stringify(testemJSON, null, 2), { encoding: 'utf8' });
  }
};
