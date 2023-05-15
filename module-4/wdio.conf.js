const LoginPage = require('./src/pageobjects/login.page');
const BasePage = require('./src/pageobjects/basePage');
const { getConfig } = require('./configs');
const environment = getConfig(`${process.argv[4]}`) ? process.argv[4] : 'local';

exports.parentConfig = {
  runner: 'local',
  specs: ['./src/tests/specs/**/*.js'],
  maxInstances: 2,
  capabilities: [
    {
      'maxInstances': 2,
      'browserName': 'chrome',
      'acceptInsecureCerts': true,
      'timeouts': { pageLoad: 10000 },
      'goog:chromeOptions': {
        args: ['--start-maximized'],
      },
    },
  ],
  waitforTimeout: 10000,
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:8080',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  reporters: [
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  beforeSuite: async function () {
    const { login, password } = getConfig(environment).user;
    await LoginPage.open();
    await LoginPage.login(login, password);
    await expect(BasePage.sideBarContainer).toBeExisting('You logged into EPAM Report portal!');
  },
};
