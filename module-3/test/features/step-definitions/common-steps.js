'use strict';

const { When } = require('@cucumber/cucumber');
const { getConfig } = require('../../config');
const WebBrowserClient = require('../../utils/webBrowserClient');

const { baseUrl } = getConfig();

When(/^Navigate to base url$/, async function () {
  try {
    await WebBrowserClient.open(baseUrl);
  } finally {
    await WebBrowserClient.close();
  }
});
