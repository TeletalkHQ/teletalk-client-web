import { Storage } from "~/classes/Storage";

class PersistentStorage {
  constructor() {
    this.#initialDefaultStorage();
  }
  storage = new Storage();
  STORAGE_KEYS = {
    STUFFS: "STUFFS",
  };

  #initialDefaultStorage() {
    Object.keys(this.STORAGE_KEYS).forEach((key) => {
      const latestKeyValue = this.getItem(key);
      this.setItem(key, latestKeyValue || "");
    });
  }

  getItem(key) {
    return this.storage.getItem(key);
  }
  getAndParseItem(key) {
    const value = this.getItem(key);
    return this.#parseValue(value);
  }
  #parseValue(value) {
    return JSON.parse(value);
  }

  setItem(key, value = "") {
    this.storage.setItem(key, value);
    return this;
  }

  removeItem(key) {
    this.storage.removeItem(key);
    return this;
  }

  clearStorage() {
    this.storage.clear();
    return this;
  }

  setDefaultStorage() {
    this.clearStorage();
    this.#initialDefaultStorage();
  }
}

export { PersistentStorage };
