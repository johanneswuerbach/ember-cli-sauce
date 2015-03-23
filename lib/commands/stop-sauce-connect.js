/* jshint node: true */
'use strict';

var runScript = require('../utils/run-script');

module.exports = {
  name: 'stop-sauce-connect',
  works: 'insideProject',
  description: 'Stop a sauce connect tunnel.',

  availableOptions: [],

  run: function() {
    return runScript(this.ui, __dirname + '/../../vendor/stop-sauce-connect.sh');
  }
};
