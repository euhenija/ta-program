'use strict';

const Page = require('./basePage');
class SideBarPage extends Page {
  get btnDashboards() {
    return $('//a[@href="#default_personal/dashboard"]');
  }
}

module.exports = new SideBarPage();
