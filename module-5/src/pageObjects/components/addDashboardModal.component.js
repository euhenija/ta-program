'use strict';

class AddDashboardModalWindow {
  element(name) {
    const selectors = {
      nameInputField: '[placeholder="Enter dashboard name"]',
      descriptionInputField: '[placeholder="Enter dashboard description"]',
      addBtn: '.bigButton__color-booger--2IfQT',
      deleteBtn: '.bigButton__color-tomato--Wvy5L',
    };
    return $(selectors[name]);
  }
}

module.exports = AddDashboardModalWindow;
