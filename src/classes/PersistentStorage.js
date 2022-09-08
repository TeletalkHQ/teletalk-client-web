import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

class PersistentStorage {
  constructor(storageKeys) {
    this.storage = localStorage;
    this.#initialDefaultStorage(storageKeys);
  }

  #initialDefaultStorage(storageKeys) {
    storageKeys.forEach((key) => {
      const latestKeyValue = this.getItem(key);
      this.setItem(key, latestKeyValue || "");
    });
  }

  clearStorage() {
    this.storage.clear();
    return this;
  }

  setDefaultStorage() {
    this.clearStorage();
    this.#initialDefaultStorage();
  }

  removeItem(key = "") {
    this.storage.removeItem(key);
    return this;
  }

  setItem(key = "", value = "") {
    this.storage.setItem(key, value);
    return this;
  }
  getItem(key = "") {
    const item = this.storage.getItem(key);
    return item;
  }

  stringifyAndSetItem(key = "", value = {}) {
    this.setItem(key, JSON.stringify(value));
    return this;
  }
  getAndParseItem(key) {
    return JSON.parse(this.getItem(key) || "{}");
  }
}

const defaultPersistentStorage = new PersistentStorage([
  PERSISTENT_STORAGE_KEYS.MAIN_TOKEN,
  PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN,
  PERSISTENT_STORAGE_KEYS.STUFFS,
  PERSISTENT_STORAGE_KEYS.STUFFS,
]);

export { defaultPersistentStorage as persistentStorage, PersistentStorage };
