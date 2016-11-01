/* global QUnit, after */
(function() {
  window.global_test_results = null;

  if (typeof QUnit !== 'undefined') {
    var log = [];
    // Custom data is limited to 64KB. Leave some padding for the other test
    // result data.
    // https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options#TestConfigurationOptions-CustomData
    var SIZE_LIMIT = 63800;
    var limitReached = false;

    function checkSize(newLog) {
      return JSON.stringify(newLog).length > SIZE_LIMIT;
    }

    function exportTestResultsForSauce(testResults) {
      testResults.tests = log;
      window.global_test_results = testResults;
    }

    // Used for testing
    exportTestResultsForSauce.name = 'exportTestResultsForSauce';

    QUnit.done(exportTestResultsForSauce);

    QUnit.log(function(details) {
      if (!limitReached && details.result === false) {
        var failure = {
          result: details.result,
          expected: details.expected,
          actual: details.actual,
          message: details.message,
          source: details.source,
          name: details.module + ': ' + details.name
        };

        var newLog = log.concat([failure]);
        if (checkSize(newLog)) {
          limitReached = true;
        } else {
          log = newLog;
        }
      }
    });

  } else if (typeof Mocha !== 'undefined') {
    after(function() {
      window.global_test_results = window.mochaRunner.stats;
      window.global_test_results.reports = [];
    });
  }
})();
