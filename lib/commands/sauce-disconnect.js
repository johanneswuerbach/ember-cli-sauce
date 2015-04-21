/* jshint node: true */
'use strict';

var runScript = require('../utils/run-script');

module.exports = {
  name: 'sauce:disconnect',
  aliases: ['stop-sauce-connect'],
  works: 'insideProject',
  description: 'Disconnect from sauce.',

  availableOptions: [],

  run: function() {
    return runScript(this.ui, __dirname + '/../../vendor/stop-sauce-connect.sh');
  }
};
