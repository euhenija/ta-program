'use strict';

const BasePage = require('./basePage');

class LaunchPage extends BasePage {
  get passedTestsElements() {
    return $$('//div[@class="statusDropdown__status-dropdown--3rxFY"]//span[.="Passed"]');
  }
}

module.exports = new LaunchPage();
