import { Storage } from "src/classes/Storage";

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
    Object.keys(this.STORAGE_KEYS).forEach((key) => {
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
