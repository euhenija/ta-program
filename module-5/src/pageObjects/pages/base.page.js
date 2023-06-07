'use strict';

class BasePage {
  constructor(url) {
    this.url = url;
  }
  async open() {
    return browser.url(this.url);
  }
}

module.exports = BasePage;
