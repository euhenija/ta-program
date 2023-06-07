'use strict';

class AddWidgetModalWindow {
  element(name) {
    const selectors = {
      nameInputField: '[placeholder="Enter widget name"]',
      descriptionInputField: '[placeholder="Enter widget description"]',
      itemsInputField: '[class="modalField__modal-field-content--3HjJX"] input',
      addBtn: '.bigButton__color-booger--2IfQT',
      deleteBtn: '.bigButton__color-tomato--Wvy5L',
      addFilterBtn: '[class="inputRadio__children-container--32kGF inputRadio__mode-default--3MEUz"]',
      nextStepBtn: '//span[.="Next step"]',
      failedCasesTrendChart: '//span/div[.="Failed cases trend chart"]',
      deleteBtn: '[class="bigButton__big-button--ivY7j bigButton__color-tomato--Wvy5L"]',
    };
    return $(selectors[name]);
  }
}

module.exports = AddWidgetModalWindow;
