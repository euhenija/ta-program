'use strict';

const { expect } = require('chai');
const { When } = require('@wdio/cucumber-framework');
const Memory = require('../utils/memory');
const { pages } = require('../pageObjects/pages');

When(
  /^I count quantity of tests with "([^"]*)" status and save its quantity as "([^"]*)" vaiable$/,
  async (status, variable) => {
    const result = await pages('launchPage').getQuantityOfTestcasesWithStatus(status);
    await Memory.setValue(`${variable}`, result);
  }
);

When(/^Variable "([^"]*)" should be equal to "(\d+)"$/, async (variable, quantity) => {
  const quantityOfElements = await Memory.getValue(variable);
  expect(quantityOfElements).to.equal(quantity);
});
