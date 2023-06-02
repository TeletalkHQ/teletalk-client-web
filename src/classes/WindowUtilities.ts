interface ExtendedWindow extends Window {
  [key: string]: any;
}

type EventCallback = (_event: Event) => void;

class WindowUtilities {
  addProperty<V extends keyof ExtendedWindow>(
    key: V,
    value: ExtendedWindow[V]
  ) {
    window[key] = value;
    return this;
  }

  isOnline() {
    return window.navigator?.onLine;
  }

  addEventListener(type: string, callback: EventCallback) {
    window.addEventListener(type, callback);
    return this;
  }
  removeEventListener(type: string, callback: EventCallback) {
    window.removeEventListener(type, callback);
    return this;
  }
}

const windowUtilities = new WindowUtilities();

export { windowUtilities, WindowUtilities };
