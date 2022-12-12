import { EventManager as EventManagerMain } from "utility-store/src/classes/EventManager";

class EventManager extends EventManagerMain {
  EVENT_EMITTER_EVENTS = {
    MESSAGE_SENT: "MESSAGE_SENT",
  };
}

const eventManager = new EventManager();

export { eventManager, EventManager };
