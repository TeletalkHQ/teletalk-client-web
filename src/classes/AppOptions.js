class AppOptions {
  constructor() {
    this.options = {
      EVENT_EMITTER_EVENTS: {
        ALL_STUFF_RECEIVED: "ALL_STUFF_RECEIVED",
      },
    };
  }
}

const appOptions = new AppOptions();

export { appOptions, AppOptions };
