/* jshint node: true */
'use strict';

var saucie = require('saucie');

module.exports = {
  name: 'sauce:launch',
  works: 'insideProject',
  description: 'Launch a sauce browser.',

  anonymousOptions: ['<saucie-params...>'],

  run: function() {
    return saucie.launch();
  }
};
