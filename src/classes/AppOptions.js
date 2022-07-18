class AppOptions {
  constructor() {
    this.options = {
      EVENT_EMITTER_EVENTS: {
        ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
      },
      requesterOptions: {
        method: "GET",
        url: "",
        data: {},
        headers: { Authorization: "" },
        token: "",
      },
      actionOptions: { type: "", payload: {} },
    };
  }
}

const appOptions = new AppOptions();

export { appOptions, AppOptions };
