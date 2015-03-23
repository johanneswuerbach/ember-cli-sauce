import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: ExportTestResults', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('registers the test export', function(assert) {
  visit('/');

  andThen(function() {
    assert.strictEqual(window.global_test_results, null);
    assert.notEqual(window.QUnit.config.callbacks.done.indexOf(window.exportTestResultsForSauce), -1);
  });
});
