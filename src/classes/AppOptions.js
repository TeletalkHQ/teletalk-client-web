//CLEANME: Remove from both side
class AppOptions {
  #options = {
    EVENT_EMITTER_EVENTS: {
      MESSAGE_SENT: "MESSAGE_SENT",
    },
    apiDefaultOptions: {
      method: "GET",
      url: "",
      headers: { Authorization: "" },
      token: "",
    },
    actionOptions: { type: "", payload: {} },
  };

  getOptions() {
    return this.#options;
  }

  getEventEmitterEvents() {
    const options = this.getOptions();
    return options.EVENT_EMITTER_EVENTS;
  }
}

const appOptions = new AppOptions();

export { appOptions, AppOptions };
