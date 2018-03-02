/* jshint node: true */
'use strict';

var path = require('path');
var saucie = require('saucie');
var RSVP = require('rsvp');

module.exports = {
  name: 'sauce:connect',
  aliases: ['start-sauce-connect'],
  works: 'insideProject',
  description: 'Connect to sauce using sauce-connect https://docs.saucelabs.com/reference/sauce-connect/.',

  availableOptions: [],

  run: function() {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      var msg = "Can't find the username or access key for SauceLabs. Please set the 'SAUCE_USERNAME' and 'SAUCE_ACCESS_KEY' environment variable.";
      return RSVP.reject(new Error(msg));
    }

    var self = this;
    var opts = {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      verbose: true,
      logger: function(message) {
        self.ui.writeLine(message, 'INFO');
      },
      pidfile: path.join(this.project.root, 'sc_client.pid'),
      connectRetries: 2
    };

    if (process.env.SAUCE_VERSION) {
      opts.connectVersion = process.env.SAUCE_VERSION;
    }

    if (process.env.TRAVIS_JOB_NUMBER) {
      opts.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }

    return saucie.connect(opts);
  }
};
