'use strict';

const BasePage = require('./base.page');

class LaunchPage extends BasePage {
  constructor() {
    super();
  }
  element(name) {
    const selectors = {
      pageLayOut: '[class="layout__scrolling-content--1Wdau"]',
      testsWithPassedStatus: '//div[@class="statusDropdown__status-dropdown--3rxFY"]//span[.="Passed"]',
    };
    return $(selectors[name]);
  }

  elements(name) {
    const selectors = {
      testsWithPassedStatus: '//div[@class="statusDropdown__status-dropdown--3rxFY"]//span[.="Passed"]',
    };
    return $$(selectors[name]);
  }

  async getQuantityOfTestcasesWithStatus(status) {
    await this.element('pageLayOut').waitForEnabled();
    await this.element(status).waitForEnabled();
    const result = await this.elements(status);
    return result.length;
  }
}

module.exports = LaunchPage;
