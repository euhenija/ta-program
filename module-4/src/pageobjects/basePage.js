'use strict';

module.exports = class BasePage {
  get sideBarContainer() {
    return $('//div[@class="layout__sidebar-container--gX2bY"]');
  }

  open(path) {
    return browser.url(`/${path}`);
  }
};
