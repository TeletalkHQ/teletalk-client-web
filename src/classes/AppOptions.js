import { transitionComponents } from "variables/otherVariables/transitionComponents";

class AppOptions {
  constructor() {
    this.options = {
      EVENT_EMITTER_EVENTS: {
        ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
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
  }

  getOptions() {
    return this.options;
  }
}

const appOptions = new AppOptions();

export { appOptions, AppOptions };
