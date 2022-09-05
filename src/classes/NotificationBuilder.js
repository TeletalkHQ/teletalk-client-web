class NotificationBuilder {
  #notificationObject = {
    description: "Default notification description",
    message: "Unknown notification message",
    notificationReason: "UNKNOWN_ERROR_REASON",
    notificationCode: 4000,
  };

  #addProperty(key, value) {
    this.#notificationObject[key] = value;
  }

  build() {
    return this.#notificationObject;
  }

  description(description) {
    this.#addProperty("description", description);
    return this;
  }
  message(message) {
    this.#addProperty("message", message);
    return this;
  }
  notificationCode(notificationCode) {
    this.#addProperty("notificationCode", notificationCode);
    return this;
  }
  notificationReason(notificationReason) {
    this.#addProperty("notificationReason", notificationReason);
    return this;
  }
}

const notificationBuilder = { create: () => new NotificationBuilder() };

export { notificationBuilder, NotificationBuilder };
