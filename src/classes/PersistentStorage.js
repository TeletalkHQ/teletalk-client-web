class PersistentStorage {
  constructor(defaultStorageState = {}) {
    this.storage = localStorage;
    this.defaultStorageState = defaultStorageState;
    this.#initialDefaultStorage();
  }

  #initialDefaultStorage() {
    Object.entries(this.defaultStorageState).forEach(([key, value]) => {
      this.setItem(key, JSON.stringify(value));
    });
  }

  clearAllStates() {
    this.storage.clear();

    return this;
  }

  setDefaultStorage() {
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
}

const defaultPersistentStorage = new PersistentStorage({
  user: {},
});

export { defaultPersistentStorage as persistentStorage, PersistentStorage };
