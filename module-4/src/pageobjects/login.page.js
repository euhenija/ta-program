'use strict';

const BasePage = require('./basePage');

class LoginPage extends BasePage {
  get inputUsername() {
    return $('input[name="login"]');
  }
  get inputPassword() {
    return $('input[name="password"]');
  }
  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  open() {
    return super.open('ui/#login');
  }
}

module.exports = new LoginPage();
