/* jshint node: true */
'use strict';

var RSVP = require('rsvp');
var path = require('path');
var sauceConnectLauncher = require('sauce-connect-launcher');
var sauceConnectLauncherPromise = RSVP.denodeify(sauceConnectLauncher);

module.exports = {
  name: 'sauce:connect',
  aliases: ['start-sauce-connect'],
  works: 'insideProject',
  description: 'Connect to sauce using sauce-connect https://docs.saucelabs.com/reference/sauce-connect/.',

  availableOptions: [],

  run: function() {
    var self = this;
    var opts = {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      verbose: true,
      logger: function(message) {
        self.ui.writeLine(message, 'INFO');
      },
      pidfile: path.join(this.project.root, 'sc_client.pid')
    };

    if (process.env.TRAVIS_JOB_NUMBER) {
      opts.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }

    return sauceConnectLauncherPromise(opts).then(function(sauceConnectProcess) {
      sauceConnectProcess.kill = function NOOP() {};
    });
  }
};
