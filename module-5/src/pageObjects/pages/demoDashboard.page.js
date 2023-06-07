'use strict';

const BasePage = require('./base.page');
const AddWidgetModalWindow = require('../components/addWidgetModal.component');

class DemoDashboard extends BasePage {
  constructor() {
    super('/ui/#default_personal/dashboard/15');
    this.addWidgetModal = new AddWidgetModalWindow();
  }
  element(name) {
    const selectors = {
      addNewWidgetBtn: '//span[.="Add new widget"]',
      launchStatisticsChartBarView: '(//div[@class="c3"])[1]//*[local-name()="svg"]',
      bugTrendWidgetHeader: '(//div[.="New widget trend1"]/../..)[2]',
      deleteBugTrendWidgetBtn: '((//div[.="New widget trend1"]/../..)[1]//*[local-name()="svg"])[5]',
      demoDashboardTitle: '[title="DEMO DASHBOARD"]',
      allDashboardTitle: '[title="All Dashboards"]',
    };
    return $(selectors[name]);
  }

  async clickOnLaunchStatisticsChartAtPoint(xCoordinate, yCoordinate) {
    await this.element('launchStatisticsChartBarView').moveTo();
    await this.element('launchStatisticsChartBarView').click({ x: xCoordinate, y: yCoordinate });
  }
}

module.exports = DemoDashboard;
