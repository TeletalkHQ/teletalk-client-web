class DomUtilities {
  constructor() {
    const { element, elementId, elementName } = this.#getDefaultState();
    this.arrayOfElements = [element];
    this.element = element;
    this.elementId = elementId;
    this.elementName = elementName;
  }
  #getDefaultState() {
    return {
      elementName: "",
      elementId: "",
      element: this.getElementById("root"),
    };
  }

  getElementById(elementId) {
    return document.getElementById(elementId);
  }
  getElementsByName(elementName) {
    return document.getElementsByName(elementName);
  }
  getFirstElementByName(elementName) {
    return this.getElementsByName(elementName)[0];
  }

  setElement(element) {
    this.element = element;
    return this;
  }
  setElementId(elementId) {
    this.elementId = elementId;
    return this;
  }
  setElementName(elementName) {
    this.elementName = elementName;
  }
  getElement() {
    return this.element;
  }

  setElementById(elementId) {
    const element = this.getElementById(elementId);
    this.setElement(element);

    this.setElementId(elementId);

    return this;
  }
  setElementByName(elementName) {
    const element = this.getFirstElementByName(elementName);
    this.setElement(element);

    this.setElementName(elementName);

    return this;
  }

  focusElement() {
    this.getElement().focus();
    return this;
  }
  selectAllValue() {
    this.getElement().select();
    return this;
  }

  reset() {
    const { element, elementId, elementName } = this.#getDefaultState();
    this.setElement(element);
    this.setElementId(elementId);
    this.setElementName(elementName);
  }
}

const domUtilities = new DomUtilities();

export { domUtilities, DomUtilities };
