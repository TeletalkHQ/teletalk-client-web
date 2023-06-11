class WindowUtilities {
  isOnline() {
    return window.navigator?.onLine;
  }
}

const windowUtilities = new WindowUtilities();

export { windowUtilities, WindowUtilities };
