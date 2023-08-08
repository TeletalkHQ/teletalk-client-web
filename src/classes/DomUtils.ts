import { DomUtils as DomUtilsMain } from "utility-store";

import { ElementId, ElementName } from "~/types";

export class DomUtils extends DomUtilsMain {
  setElementByName(elementName: ElementName) {
    super.setElementByName(elementName);
    return this;
  }

  getElementById(elementId: ElementId): HTMLElement | null {
    return super.getElementById(elementId);
  }
}

export const domUtils = () => new DomUtils();
