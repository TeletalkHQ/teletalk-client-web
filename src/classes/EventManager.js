const EventEmitter = require("events");

const emitter = new EventEmitter();

class EventManager {
  constructor() {
    this.events = {};
  }

  getEvent(eventName) {
    return this.events[eventName];
  }

  emitEvent({ event, ...args }) {
    emitter.emit(event, args);
  }

  getDefaultEventItem() {
    return {
      listeners: [],
    };
  }

  addListener(eventName, listener) {
    const event = this.getEvent(eventName) || this.getDefaultEventItem();

    event.listeners.push(listener);
    this.events[eventName] = event;
    emitter.on(eventName, listener);
  }

  removeListener(eventName) {
    const event = this.getEvent(eventName);

    if (event) {
      emitter.removeAllListeners(eventName);
      delete this.events[eventName];
    }
  }
}

const eventManager = new EventManager();

export { eventManager };
