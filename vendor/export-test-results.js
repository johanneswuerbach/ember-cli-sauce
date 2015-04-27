/* global QUnit, after */

window.global_test_results = null;
var exportTestResultsForSauce = function(testResults) {
  window.global_test_results = testResults;
};

if (typeof QUnit !== 'undefined') {
  QUnit.done(exportTestResultsForSauce);
} else if (typeof Mocha !== 'undefined') {
  after(exportTestResultsForSauce);
}
