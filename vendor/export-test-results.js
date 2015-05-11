/* global QUnit */

window.global_test_results = null;
var exportTestResultsForSauce = function(testResults) {
  window.global_test_results = testResults;
};

if (typeof QUnit !== 'undefined') {
  QUnit.done(exportTestResultsForSauce);
} else if (typeof Mocha !== 'undefined') {
  // Mocha stats reporting requires access to the mocha runner
  // Issue: https://github.com/switchfly/ember-cli-mocha/issues/52
  // after(exportTestResultsForSauce);
  delete window.global_test_results;
}
