import { EventManager as EventManagerMain } from "utility-store/src/classes/EventManager";

//TODO: Move methods to EventManagerMain
class EventManager extends EventManagerMain {
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

const eventManager = new EventManager();

export { eventManager, EventManager };
