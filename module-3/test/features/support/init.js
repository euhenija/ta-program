'use strict';

const { Before, After, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { SECONDS_TO_MS_RATIO } = require('../../constants');

setDefaultTimeout(20 * SECONDS_TO_MS_RATIO);

Before(async function f(scenario) {
  this.scenario = scenario.pickle.name;
  console.log(`Start executing scenario "${scenario.pickle.name}"`);
});

After(async function f(scenario) {
  if (scenario.result.status === Status.PASSED) {
    console.log(`Scenario "${scenario.pickle.name}" has passed successfully`);
  }
});
