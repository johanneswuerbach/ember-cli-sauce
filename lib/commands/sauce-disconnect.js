/* jshint node: true */
'use strict';

var path = require('path');
var saucie = require('saucie');

module.exports = {
  name: 'sauce:disconnect',
  aliases: ['stop-sauce-connect'],
  works: 'insideProject',
  description: 'Disconnect from sauce.',

  availableOptions: [],

  run: function() {
    var pidFile = path.join(this.project.root, 'sc_client.pid');

    return saucie.disconnect(pidFile);
  }
};
