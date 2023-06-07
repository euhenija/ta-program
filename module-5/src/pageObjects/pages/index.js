'use strict';

const AllDashboardsPage = require('./allDashboards.page');
const DemoDashboard = require('./demoDashboard.page');
const LaunchPage = require('./launch.page');
const SideMenue = require('./sideMenue');
const LoginPage = require('./login.page');

function pages(name) {
  const items = {
    allDashboardsPage: new AllDashboardsPage(),
    demoDashboardPage: new DemoDashboard(),
    launchPage: new LaunchPage(),
    sideMenuePage: new SideMenue(),
    loginPage: new LoginPage(),
  };
  return items[name];
}

module.exports = { pages };
