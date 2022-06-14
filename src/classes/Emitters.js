const EventEmitter = require("events");

const emitter = new EventEmitter();

class Emitters {
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

    this.events[event] = { eventName: event, listener };

    emitter.on(event, listener);
  }

  removeListener({ event }) {
    const e = this.events[event];

    if (e) {
      delete this.events[event];
    }
  }
}

const emitters = new Emitters();

export { emitters };
