/* jshint node: true */
'use strict';

var rsvp = require('rsvp');
var childProcess = require('child_process');

module.exports = function(ui, script) {
  return new rsvp.Promise(function(resolve, reject) {
    var run = childProcess.spawn(script);
    run.stdout.on('data', function(chunk) {
      ui.write(chunk);
    });

    run.stderr.on('data', function(chunk) {
      ui.write(chunk, ui.WRITE_LEVELS.ERROR);
    });

    run.on('error', function(err) {
      reject(err);
    });

    run.on('exit', function() {
      resolve();
    });
  });
};
