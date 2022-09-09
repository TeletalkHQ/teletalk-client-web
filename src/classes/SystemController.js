class SystemController {
  constructor() {
    this.events = {
      ALL_STUFF_RECEIVED: {
        status: "none",
      },
    };
  }
  getAllEventsStatus() {
    return this.events;
  }
  getEventStatus(eventName) {
    return this.events[eventName];
  }
  setEventStatus(eventName, status) {
    const event = this.getEventStatus(eventName);
    this.changeEventStatus(event, status);

    return this;
  }
  changeEventStatus(event, status) {
    event.status = status;
  }

  changeEventStatusToDone(eventName) {
    this.setEventStatus(eventName, "done");
  }
}

const systemController = new SystemController();

export { systemController, SystemController };
