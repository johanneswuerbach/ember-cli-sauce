/* jshint node: true */
'use strict';

var runScript = require('../utils/run-script');

module.exports = {
  name: 'sauce:connect',
  aliases: ['start-sauce-connect'],
  works: 'insideProject',
  description: 'Connect to sauce using sauce-connect https://docs.saucelabs.com/reference/sauce-connect/.',

  availableOptions: [],

  run: function() {
    return runScript(this.ui, __dirname + '/../../vendor/start-sauce-connect.sh');
  }
};
