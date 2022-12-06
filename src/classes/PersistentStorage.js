import { customTypeof } from "utility-store/src/classes/CustomTypeof";
import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

class Storage {
  storage = localStorage;

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

class PersistentStorage {
  constructor() {
    this.#initialDefaultStorage();
  }
  persistentStorage = new Storage();
  STORAGE_KEYS = {
    TOKEN: "TOKEN",
    STUFFS: "STUFFS",
  };

  #initialDefaultStorage() {
    objectUtilities.objectKeys(this.STORAGE_KEYS).forEach((key) => {
      const latestKeyValue = this.getItem(key);
      this.setItem(key, latestKeyValue || "");
    });
  }

  getItem(key) {
    return this.persistentStorage.getItem(key);
  }
  getAndParseItem(key) {
    const value = this.getItem(key);
    return this.#parseValue(value);
  }
  #parseValue(value) {
    return JSON.parse(value);
  }

  setItem(key, value = "") {
    this.persistentStorage.setItem(key, value);
    return this;
  }

  removeItem(key) {
    this.persistentStorage.removeItem(key);
    return this;
  }

  clearStorage() {
    this.persistentStorage.clear();
    return this;
  }

  setDefaultStorage() {
    this.clearStorage();
    this.#initialDefaultStorage();
  }
}

const defaultPersistentStorage = new PersistentStorage();

export { defaultPersistentStorage as persistentStorage, PersistentStorage };
