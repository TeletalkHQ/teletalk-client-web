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
    };
  }

  getOptions() {
    return this.options;
  }
}

const appOptions = new AppOptions();

export { appOptions, AppOptions };
