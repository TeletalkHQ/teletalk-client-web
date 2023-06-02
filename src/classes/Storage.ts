import { customTypeof } from "custom-typeof";

class Storage {
  constructor() {
    this.storage = typeof window !== "undefined" ? localStorage : {};
  }

  #fixingCondition(value) {
    return customTypeof.isObject(value) || customTypeof.isArray(value);
  }
  #stringifyValue(value) {
    return JSON.stringify(value);
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, value) {
    const fixedValue = this.#fixSetValue(value);
    this.storage.setItem(key, fixedValue);
    return this;
  }
  #fixSetValue(value) {
    return this.#fixingCondition(value) ? this.#stringifyValue(value) : value;
  }

  clear() {
    this.storage.clear();
    return this;
  }
  removeItem(key) {
    this.storage.removeItem(key);
  }
}

export { Storage };
