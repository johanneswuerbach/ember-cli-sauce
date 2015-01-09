/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sauce',

  included: function included(app) {
    this._super.included(app);

    if (app.tests) {
      app.import('vendor/export-test-results.js', {
        type: 'test'
      });
    }
  },
};
