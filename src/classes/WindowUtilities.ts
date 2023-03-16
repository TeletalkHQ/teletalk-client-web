interface ExtendedWindow extends Window {
  [key: string]: any;
}

type EventCallback = (_event: Event) => void;

class WindowUtilities {
  private window: ExtendedWindow;

  constructor() {
    this.window = window;
  }

  addProperty<V extends keyof ExtendedWindow>(
    key: V,
    value: ExtendedWindow[V]
  ) {
    this.window[key] = value;
    return this;
  }

  isOnline() {
    return this.window.navigator?.onLine;
  }

  addEventListener(type: string, callback: EventCallback) {
    this.window.addEventListener(type, callback);
    return this;
  }
  removeEventListener(type: string, callback: EventCallback) {
    this.window.removeEventListener(type, callback);
    return this;
  }
}

const windowUtilities = new WindowUtilities();

export { windowUtilities, WindowUtilities };
