/* eslint-env node */
'use strict';
var commands  = require('./lib/commands');

module.exports = {
  name: 'ember-cli-sauce',

  includedCommands: function() {
    return commands;
  },

  included: function included(app) {
    this._super.included(app);

    if (app.tests) {
      app.import('vendor/export-test-results.js', {
        type: 'test'
      });
    }
  }
};
