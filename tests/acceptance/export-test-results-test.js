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
    assert.ok(window.QUnit.config.callbacks.done.some(function(fn) {
      return fn.name === 'exportTestResultsForSauce';
    }));
  });
});
