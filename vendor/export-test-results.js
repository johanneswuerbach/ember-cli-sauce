/* global QUnit */

window.global_test_results = null;
var exportTestResultsForSauce = function(testResults) {
  window.global_test_results = testResults;
}
//Prevent those not using QUnit from having Broccoli imports broken
if (typeof QUnit != 'undefined') {
	QUnit.done(exportTestResultsForSauce);
};
