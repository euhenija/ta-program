'use strict';

const { getConfig } = require('./config');
const { pages } = require('./src/pageObjects/pages');

const environment = getConfig(`${process.argv[4]}`) ? process.argv[4] : 'local';

exports.config = {
  runner: 'local',
  specs: ['./src/features/**/*.feature'],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 2,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: ['--start-maximized', '--window-size=1920,1080'],
      },
    },
  ],
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
  logLevel: 'error',
  bail: 0,
  baseUrl: 'http://localhost:8080/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'cucumber',
  cucumberOpts: {
    require: ['./src/stepDefinitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
  async beforeScenario() {
    const { login, password } = getConfig(environment).user;
    await pages('loginPage').open();
    await pages('loginPage').login(login, password);
  },
  async afterScenario() {
    await pages('sideMenuePage').logOut();
  },
};
