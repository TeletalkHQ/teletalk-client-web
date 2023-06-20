import { DomUtilities } from "utility-store";

import { ElementId, ElementName } from "~/types";

class DomUtils extends DomUtilities {
  setElementByName(elementName: ElementName): this {
    super.setElementByName(elementName);
    return this;
  }

  getElementById(elementId: ElementId): HTMLElement | null {
    return super.getElementById(elementId);
  }
}

const domUtils = () => new DomUtils();

export { domUtils };
