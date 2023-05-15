'use strict';

const BasePage = require('./basePage');

class DashboardPage extends BasePage {
  get demoDashboard() {
    return $('[data-id="15"] a[href="#default_personal/dashboard/15"]');
  }
  get btnAddNewWidget() {
    return $('//span[.="Add new widget"]');
  }

  get btnAddDashboard() {
    return $('//button//span[contains(text(), "Add New Dashboard")]');
  }
  get btnDeleteDashboard() {
    return $('//span[.="Delete"]');
  }
  get btnDeleteDashboardPopUp() {
    return $('div[class="modalFooter__button-container--2RXFR"]:nth-of-type(2)');
  }
  get inputDashboardName() {
    return $('[placeholder="Enter dashboard name"]');
  }
  get inputDashboardstDescription() {
    return $('[placeholder="Enter dashboard description"]');
  }
  get btnAdd() {
    return $('//button[.="Add"]');
  }

  get addNewWidgetPopUp() {
    return $('//div/span[.="Add new widget"]');
  }
  get radioBtnBugTrend() {
    return $('//input[@value="bugTrend"]/..');
  }
  get btnAddFilter() {
    return $('[class="inputRadio__children-container--32kGF inputRadio__mode-default--3MEUz"]');
  }
  get btnNextStep() {
    return $('//span[.="Next step"]');
  }
  get inputWidgetName() {
    return $('[placeholder="Enter widget name"]');
  }
  get inputWidgetDescription() {
    return $('[placeholder="Enter widget description"]');
  }
  get inputItems() {
    return $('[class="modalField__modal-field-content--3HjJX"] input');
  }

  get lastCreatedwidgetHeder() {
    return $('(//div[@class="widgetHeader__info-block--1n0yX"])[1]');
  }
  get iconDeleteLastCreatedWidget() {
    return $('((//div[@class="widgetHeader__controls-block--1U99N"])[1]//*[local-name()="svg"])[3]');
  }
  get launchStatisticsChartBarView() {
    return $('(//div[@class="c3"])[1]//*[local-name()="svg"]');
  }
  get failedCasesTrendChart() {
    return $('//div[.="Failed cases trend chart"]');
  }

  async getDashboardTitle(dashboardName) {
    const dashboardTitle = $(`//span[@title="${dashboardName}"]`);
    await dashboardTitle.waitForDisplayed();
    return await dashboardTitle.getText();
  }

  async createNewWidget(widgetInfo) {
    const { name, description, itemQuantity } = widgetInfo;
    await this.btnAddNewWidget.click();
    await this.addNewWidgetPopUp.waitForDisplayed();
    await this.radioBtnBugTrend.click();
    await this.btnNextStep.click();
    await this.btnAddFilter.click();
    await this.inputItems.setValue(itemQuantity);
    await this.btnNextStep.click();
    await this.inputWidgetName.setValue(name);
    await this.inputWidgetDescription.click();
    await this.inputWidgetDescription.setValue(description);
    await this.btnAdd.click();
    await this.lastCreatedwidgetHeder.waitForClickable();
  }
}

module.exports = new DashboardPage();
