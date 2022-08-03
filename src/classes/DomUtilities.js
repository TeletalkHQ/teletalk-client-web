class DomUtilities {
  constructor() {
    this.elementName = "";
    this.elementId = "";
    this.element = {};
  }

  setElementById(elementId) {
    this.element = document.getElementById(elementId);
    this.elementId = elementId;
    return this;
  }
  setElementByName(elementName) {
    this.element = document.getElementsByName(elementName)[0];
    this.elementName = elementName;
    return this;
  }

  focusElement() {
    this.element.focus();
    return this;
  }
  selectAllValue() {
    this.element.select();
    return this;
  }
}

const domUtilities = new DomUtilities();

export { domUtilities, DomUtilities };
