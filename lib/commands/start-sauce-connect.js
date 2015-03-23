/* jshint node: true */
'use strict';

var runScript = require('../utils/run-script');

module.exports = {
  name: 'start-sauce-connect',
  works: 'insideProject',
  description: 'Start a sauce connect tunnel.',

  availableOptions: [],

  run: function() {
    return runScript(this.ui, __dirname + '/../../vendor/start-sauce-connect.sh');
  }
};
