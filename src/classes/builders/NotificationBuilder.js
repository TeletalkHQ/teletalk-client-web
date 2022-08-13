class NotificationBuilder {
  constructor() {
    this.notificationObject = {
      description: "Default route description",
      message: "",
      notificationReason: "UNKNOWN_ERROR",
      notificationCode: 4000,
      show: false,
    };
  }

  #addProperty(key, value) {
    this.notificationObject[key] = value;
  }

  build() {
    return this.notificationObject;
  }

  notificationCode(notificationCode) {
    this.#addProperty("notificationCode", notificationCode);
    return this;
  }
  message(message) {
    this.#addProperty("message", message);
    return this;
  }
  notificationReason(errorReason) {
    this.#addProperty("errorReason", errorReason);
    return this;
  }
  description(description) {
    this.#addProperty("description", description);
    return this;
  }
}

const notificationBuilder = { create: () => new NotificationBuilder() };

export { notificationBuilder, NotificationBuilder };
