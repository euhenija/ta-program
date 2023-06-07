'use strict';

const BasePage = require('./base.page');

class SideMenue extends BasePage {
  constructor() {
    super();
  }
  element(name) {
    const selectors = {
      dashboardButton: 'div .sidebarButton__sidebar-nav-btn--1prEO a[href="#default_personal/dashboard"]',
      userIcon: '[alt="avatar"]',
      logoutField: 'div.userBlock__menu-item--3VBsZ',
      welcomeText: '//span[contains(text(), "login to your account")]',
    };
    return $(selectors[name]);
  }

  async logOut() {
    await this.element('userIcon').waitForClickable();
    await this.element('userIcon').click();
    await this.element('logoutField').waitForClickable();
    await this.element('logoutField').click();
    await this.element('welcomeText').waitForDisplayed();
  }
}

module.exports = SideMenue;
