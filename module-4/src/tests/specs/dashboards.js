'use strict';

const { DashboardPage } = require('../../pageobjects');
const { dashboardsData } = require('../../../data');

describe('Dashboards', () => {
  dashboardsData.forEach((dashboardTestData) => {
    it('should create new dashboard', async () => {
      const { name, description } = dashboardTestData;
      await DashboardPage.btnAddDashboard.waitForDisplayed();
      await DashboardPage.btnAddDashboard.click();
      await DashboardPage.inputDashboardName.setValue(name);
      await DashboardPage.inputDashboardstDescription.setValue(description);
      await DashboardPage.btnAdd.click();
      const createdDashboardTitle = await DashboardPage.getDashboardTitle(name);
      expect(createdDashboardTitle).toEqual(name.toUpperCase());
      await DashboardPage.btnDeleteDashboard.waitForDisplayed();
      await DashboardPage.btnDeleteDashboard.click();
      await DashboardPage.btnDeleteDashboardPopUp.waitForDisplayed();
      await DashboardPage.btnDeleteDashboardPopUp.click();
    });
  });
});
