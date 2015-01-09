import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: ExportTestResults', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('registers the test export', function() {
  visit('/');

  andThen(function() {
    strictEqual(window.global_test_results, null);
    notEqual(QUnit.config.callbacks.done.indexOf(window.exportTestResultsForSauce), -1);
  });
});
