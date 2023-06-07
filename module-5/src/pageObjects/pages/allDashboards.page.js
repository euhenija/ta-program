'use strict';

const BasePage = require('./base.page');
const AddDashboardModalWindow = require('../components/addDashboardModal.component');

class AllDashboardsPage extends BasePage {
  constructor() {
    super('/ui/#default_personal/dashboard');
    this.addDashboardModal = new AddDashboardModalWindow();
  }
  element(name) {
    const selectors = {
      addNewDashsboardBtn: '.addDashboardButton__add-dashboard-btn--_w75i',
      demoDashboard: '//*[contains(@class,"dashboardTable")]//a[contains(text(), "DEMO DASHBOARD")]',
    };
    return $(selectors[name]);
  }

  elements(name) {
    const selectors = {
      dashboards: '.dashboardTable__name--1sWJs',
      deleteDashboardBtns: '.icon__icon-delete--1jIHF',
    };
    return $$(selectors[name]);
  }

  async open() {
    return super.open(this.url);
  }
}

module.exports = AllDashboardsPage;
