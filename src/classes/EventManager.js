const EventEmitter = require("events");

const emitter = new EventEmitter();

class EventManager {
  constructor() {
    this.events = {};
  }

  emitEvent({ event, ...args }) {
    emitter.emit(event, args);
  }

  addListener({ event, listener }) {
    // this.events[event] = {
    //   ...this.events[event],
    //   listeners: [...this.events[event]?.listeners, listener],
    // };
    emitter.on(event, listener);
  }

  removeListener({ event }) {
    const e = this.events[event];

    if (e) {
      delete this.events[event];
    }
  }
}

const eventManager = new EventManager();

export { eventManager };
