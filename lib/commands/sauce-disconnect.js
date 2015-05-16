/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var RSVP = require('rsvp');

module.exports = {
  name: 'sauce:disconnect',
  aliases: ['stop-sauce-connect'],
  works: 'insideProject',
  description: 'Disconnect from sauce.',

  availableOptions: [],

  run: function() {
    var pidFile = path.join(this.project.root, 'sc_client.pid');

    return new RSVP.Promise(function(resolve, reject) {
      fs.readFile(pidFile, function(err, content) {
        if (err) {
          return reject(err);
        }
        process.on('exit', function() {
          resolve();
        });
        process.kill(parseInt(content, 10), 'SIGINT');
      });
    });
  }
};
