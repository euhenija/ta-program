'use strict';

const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor() {
    super('ui/#login');
  }
  element(name) {
    const selectors = {
      inputUsername: 'input[name="login"]',
      inputPassword: 'input[name="password"]',
      btnSubmit: 'button[type="submit"]',
    };
    return $(selectors[name]);
  }

  async login(username, password) {
    await this.element('inputUsername').waitForDisplayed();
    await this.element('inputUsername').setValue(username);
    await this.element('inputPassword').waitForDisplayed();
    await this.element('inputPassword').setValue(password);
    await this.element('btnSubmit').waitForClickable();
    await this.element('btnSubmit').click();
  }

  async open() {
    return super.open(this.url);
  }
}

module.exports = LoginPage;
