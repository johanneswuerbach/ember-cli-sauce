/* jshint node: true */
'use strict';

var RSVP = require('rsvp');
var saucie = require('saucie');
var promiseSaucie = RSVP.denodeify(saucie);

module.exports = {
  name: 'sauce:launch',
  works: 'insideProject',
  description: 'Launch a sauce browser.',

  anonymousOptions: ['<saucie-params...>'],

  run: function() {
    return promiseSaucie({});
  }
};
