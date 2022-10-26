class SystemController {
  constructor() {
    this.events = {
      ALL_STUFF_RECEIVED: {
        status: "none",
      },
    };
  }
  getEvent(eventName) {
    return this.events[eventName];
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

const systemController = new SystemController();

export { systemController, SystemController };
