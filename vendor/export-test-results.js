/* global QUnit */

window.global_test_results = null;
var exportTestResultsForSauce = function(testResults) {
  window.global_test_results = testResults;
}
QUnit.done(exportTestResultsForSauce);
