import Events from "events";

const emitter = new Events();

class EventEmitter {
  EVENT_EMITTER_EVENTS = {
    MESSAGE_SENT: "MESSAGE_SENT",
  };

  constructor() {
    this.events = {};
  }

  getEvent(eventName) {
    return this.events[eventName];
  }

  emitEvent(event, ...args) {
    emitter.emit(event, ...args);
  }

  #getDefaultEventItem() {
    return {
      listeners: [],
    };
  }

  addListener(eventName, listener) {
    const event = this.getEvent(eventName) || this.#getDefaultEventItem();

    event.listeners.push(listener);
    this.events[eventName] = event;
    emitter.on(eventName, listener);
  }

  removeEventFromEvents(eventName) {
    delete this.events[eventName];
  }

  removeAllListener(eventName) {
    const event = this.getEvent(eventName);
    if (event) {
      emitter.removeAllListeners(eventName);
      this.removeEventFromEvents(eventName);
    }
  }

  getEventStatus(eventName) {
    return this.getEvent(eventName).status;
  }
  setEventStatus(eventName, status) {
    const event = this.getEvent(eventName);
    this.changeEventStatus(event, status);
    return this;
  }
  changeEventStatus(event, status) {
    event.status = status;
    return this;
  }
  changeEventStatusToDone(eventName) {
    this.setEventStatus(eventName, "done");
  }
}

const eventEmitter = new EventEmitter();

export { eventEmitter, EventEmitter };
