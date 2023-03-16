import { EventEmitter as EventEmitterMain } from "utility-store";

class EventEmitter extends EventEmitterMain {
  EVENT_EMITTER_EVENTS = {
    MESSAGE_SENT: "MESSAGE_SENT",
  };
}

const eventEmitter = new EventEmitter();

export { eventEmitter, EventEmitter };
