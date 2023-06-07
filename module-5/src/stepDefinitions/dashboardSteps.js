'use strict';

const { When, Then } = require('@wdio/cucumber-framework');
const { pages } = require('../pageObjects/pages');

Then(/^I click on "([^"]*)" button on Demo dashboard page$/, async (button) => {
  await pages('demoDashboardPage').element(button).waitForClickable();
  await pages('demoDashboardPage').element(button).click();
});

Then(/^I click on "([^"]*)" element on Demo dashboard page$/, async (button) => {
  await pages('demoDashboardPage').element(button).waitForDisplayed();
  await pages('demoDashboardPage').element(button).click();
});

Then(/^I click on "([^"]*)" button on Add new widget modal$/, async (element) => {
  await pages('demoDashboardPage').addWidgetModal.element(element).waitForClickable();
  await pages('demoDashboardPage').addWidgetModal.element(element).click();
});

Then(/^I click on "([^"]*)" element on Add new widget modal$/, async (element) => {
  await pages('demoDashboardPage').addWidgetModal.element(element).waitForDisplayed();
  await pages('demoDashboardPage').addWidgetModal.element(element).click();
});

When(/^I set value "([^"]*)" in "([^"]*)" field on Add widget modal window$/, async (value, fieldName) => {
  const input = await pages('demoDashboardPage').addWidgetModal.element(fieldName);
  await input.waitForDisplayed();
  await input.setValue(value);
});

Then(/^I check that "([^"]*)" is present on Demo dashboard page$/, async (element) => {
  const el = await pages('demoDashboardPage').element(element);
  await expect(el).toBeDisplayed();
});

Then(/^I check that "([^"]*)" is absent on Demo dashboard page$/, async (element) => {
  await expect(await pages('demoDashboardPage').element(element)).not.toBeDisplayed();
});

When(/^I click on launch statistics chart at a point \("(-?\d+)"\, "\-?(\d+)"\)$/, async (xCoordinate, yCoordinate) => {
  await pages('demoDashboardPage').clickOnLaunchStatisticsChartAtPoint(xCoordinate, yCoordinate);
});
