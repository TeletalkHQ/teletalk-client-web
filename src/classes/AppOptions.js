import { transitionComponents } from "variables/otherVariables/transitionComponents";

class AppOptions {
  #options = {
    EVENT_EMITTER_EVENTS: {
      ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
      MESSAGE_SENT: "MESSAGE_SENT",
    },
    apiDefaultOptions: {
      method: "GET",
      url: "",
      headers: { Authorization: "" },
      token: "",
    },
    actionOptions: { type: "", payload: {} },
    ui: {
      transitions: transitionComponents,
    },
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
