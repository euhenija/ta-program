'use strict';

const { SideBarPage, LaunchPage, DashboardPage } = require('../../pageobjects');
const { widgetsData, launchStatisticsBarData } = require('../../../data');

describe('Widgets on demo dashboard', () => {
  widgetsData.forEach((widgetInputData) => {
    it('should create failed cases trend chart widget in demo dashboard area', async () => {
      await DashboardPage.demoDashboard.waitForDisplayed();
      await DashboardPage.demoDashboard.moveTo();
      await DashboardPage.demoDashboard.click();
      await DashboardPage.btnAddNewWidget.waitForClickable();
      await DashboardPage.createNewWidget(widgetInputData);
      await DashboardPage.lastCreatedwidgetHeder.waitForExist();
      await expect(DashboardPage.failedCasesTrendChart).toBeExisting('Failed test cases chart is created');
      await DashboardPage.lastCreatedwidgetHeder.click();
      await DashboardPage.iconDeleteLastCreatedWidget.waitForClickable();
      await DashboardPage.iconDeleteLastCreatedWidget.click();
      await DashboardPage.btnDeleteDashboardPopUp.waitForClickable();
      await DashboardPage.btnDeleteDashboardPopUp.click();
      await SideBarPage.btnDashboards.waitForClickable();
      await SideBarPage.btnDashboards.click();
    });
  });

  launchStatisticsBarData.forEach((launchData) => {
    it('launch statistics bar view widget should display correct quantity of passed testss', async () => {
      await DashboardPage.demoDashboard.waitForDisplayed();
      await DashboardPage.demoDashboard.moveTo();
      await DashboardPage.demoDashboard.click();
      await DashboardPage.launchStatisticsChartBarView.waitForDisplayed();
      await DashboardPage.launchStatisticsChartBarView.waitForClickable();
      await DashboardPage.launchStatisticsChartBarView.click({
        x: launchData.barXCoordinate,
        y: launchData.barYCoordinate,
      });
      await browser.pause(2000);
      const quantityOfPassedTests = await LaunchPage.passedTestsElements;
      expect(quantityOfPassedTests.length).toEqual(launchData.quantityOfPassedTests);
      await SideBarPage.btnDashboards.waitForClickable();
      await SideBarPage.btnDashboards.click();
    });
  });
});
