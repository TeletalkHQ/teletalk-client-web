class WindowUtilities {
  isOnline() {
    return window?.navigator?.onLine;
  }
  addProperty(key, value) {
    window[key] = value;
    return this;
  }
  addEventListener(type, callback) {
    window.addEventListener(type, callback);
    return this;
  }
  removeEventListener(type, callback) {
    window.removeEventListener(type, callback);
    return this;
  }
}

const windowUtilities = new WindowUtilities();

export { windowUtilities, WindowUtilities };
