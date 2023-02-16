import { EventManager as EventManagerMain } from "utility-store/src/classes/EventManager";

class EventEmitter extends EventManagerMain {
  EVENT_EMITTER_EVENTS = {
    MESSAGE_SENT: "MESSAGE_SENT",
  };
}

const eventEmitter = new EventEmitter();

export { eventEmitter, EventEmitter };
