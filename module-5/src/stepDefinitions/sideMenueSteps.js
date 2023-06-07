'use strict';

const { When } = require('@wdio/cucumber-framework');
const { pages } = require('../pageObjects/pages');

When(/^I click on "([^"]*)" icon on side menue$/, async (iconName) => {
  await pages('sideMenuePage').element(iconName).waitForClickable();
  await pages('sideMenuePage').element(iconName).click();
});
