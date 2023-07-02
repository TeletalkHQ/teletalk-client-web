import { DomUtils as DomUtilsMain } from "utility-store";

import { ElementId, ElementName } from "~/types";

class DomUtils extends DomUtilsMain {
  setElementByName(elementName: ElementName) {
    super.setElementByName(elementName);
    return this;
  }

  getElementById(elementId: ElementId): HTMLElement | null {
    return super.getElementById(elementId);
  }
}

const domUtils = () => new DomUtils();

export { domUtils };
