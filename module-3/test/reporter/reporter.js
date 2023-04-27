'use strict';

const reporter = require('cucumber-html-reporter');
const { getConfig } = require('../config');

const { environment } = getConfig();

reporter.generate({
  theme: 'bootstrap',
  output: 'test/reporter/reports/cucumber_report.html',
  jsonFile: 'test/reporter/reports/cucumber_report.json',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': `${environment}`,
    'Execution Time': new Date().toLocaleString(),
  },
});
