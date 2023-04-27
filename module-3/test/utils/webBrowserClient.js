'use strict';

const { remote } = require('webdriverio');

const { SECONDS_TO_MS_RATIO } = require('../constants');

const TIMEOUT = 10 * SECONDS_TO_MS_RATIO;

class WebBrowserClient {
  async createBrowserInstance() {
    this.browser = await remote({
      automationProtocol: 'devtools',
      logLevel: 'warn',
      capabilities: {
        'goog:chromeOptions': {
          args: ['--headless', '--disable-gpu', '--disable-web-security', '--no-sandbox'],
        },
        browserName: 'chrome',
      },
    });
    return this.browser;
  }

  async getBrowser() {
    return this.browser || this.createBrowserInstance();
  }

  async setBrowserTimeouts() {
    if (this.browser) {
      await this.browser.setTimeout({ script: TIMEOUT, pageLoad: TIMEOUT });
    }
  }

  async open(url) {
    const browser = await this.getBrowser();
    return browser.navigateTo(url);
  }

  async close() {
    await this.browser.deleteSession();
    this.browser = null;
  }

  waitForPageToLoad(timeToWaitMillis = TIMEOUT) {
    const errorMessage = `Timed out after ${timeToWaitMillis / 1000} seconds waiting for page to be loaded`;
    return Promise.race([
      this.browser.execute(async () => document.readyState),
      new Promise((reject) => setTimeout(() => reject(new Error(errorMessage)), timeToWaitMillis)),
    ]);
  }

  async setPageElementValue(selector, value, timeout = TIMEOUT) {
    const element = await this.browser.$(selector);
    await element.waitForDisplayed({ timeout });
    return element.setValue(value);
  }

  async clickOnPageElement(selector, timeout = TIMEOUT) {
    const element = await this.browser.$(selector);
    await element.waitForClickable({ timeout });
    return element.click();
  }
}

module.exports = new WebBrowserClient();
