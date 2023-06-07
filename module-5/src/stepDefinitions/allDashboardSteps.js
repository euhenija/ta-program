'use strict';

const { When } = require('@wdio/cucumber-framework');
const { assert } = require('chai');

const { pages } = require('../pageObjects/pages');

When(/^I check that "([^"]*)" dashboard is "([^"]*)" on All Dashboards page$/, async (dashboardName, status) => {
  const listOfDashboards = await pages('allDashboardsPage').elements('dashboards');
  const listOfDashboard = await listOfDashboards.map(async (element) => {
    return await element.getText();
  });
  await Promise.all(listOfDashboard).then((responses) => {
    if (status === 'present') {
      assert.include(responses, dashboardName, `There is no dashboards with ${dashboardName} on dashboard page`);
    } else {
      assert.notInclude(responses, dashboardName, `Dashboards with ${dashboardName} name exists on dashboard page`);
    }
  });
});

When(/^I set dashboard name and description$/, async (dataTable) => {
  const dashbordInputData = dataTable.hashes();
  const { dashboardName, dashboardDescription } = dashbordInputData[0];
  const nameInput = await pages('allDashboardsPage').addDashboardModal.element('nameInputField');
  await nameInput.waitForDisplayed();
  await nameInput.setValue(dashboardName);
  const descriptionInput = await pages('allDashboardsPage').addDashboardModal.element('descriptionInputField');
  await descriptionInput.waitForDisplayed();
  await descriptionInput.setValue(dashboardDescription);
});

When(/^I delete "([^"]*)" dashboard$/, async (dash) => {
  await pages('allDashboardsPage').elements('deleteDashboardBtns')[0].waitForDisplayed();
  const dashboardDeleteBbtn = await pages('allDashboardsPage').elements('deleteDashboardBtns')[1];
  await dashboardDeleteBbtn.waitForClickable();
  await dashboardDeleteBbtn.click();
});

When(/^I click on "([^"]*)" button on Add new dashboard modal$/, async (element) => {
  await pages('allDashboardsPage').addDashboardModal.element(element).waitForClickable();
  await pages('allDashboardsPage').addDashboardModal.element(element).click();
});

When(/^I set value "([^"]*)" in "([^"]*)" field on Add dashboard modal window$/, async (value, fieldName) => {
  const input = await pages('allDashboardsPage').addDashboardModal.element(fieldName);
  await input.waitForDisplayed();
  await input.setValue(value);
});

When(/^I click on "([^"]*)" on All dashboards page$/, async (element) => {
  await pages('allDashboardsPage').element(element).waitForDisplayed();
  await pages('allDashboardsPage').element(element).click();
});

When(/^I check that "([^"]*)" is present on All dashboard page$/, async (element) => {
  await expect(await pages('allDashboardsPage').element(element)).toBeDisplayed();
});
