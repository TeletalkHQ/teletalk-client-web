import { Notification } from "~/types";

class NotificationBuilder {
  private notification: Notification;

  build() {
    return this.notification;
  }

  description(description: string) {
    this.notification.description = description;
    return this;
  }
  message(message: string) {
    this.notification.message = message;
    return this;
  }
  code(code: number) {
    this.notification.code = code;
    return this;
  }
  reason(reason: string) {
    this.notification.reason = reason;
    return this;
  }
}

const notificationBuilder = { create: () => new NotificationBuilder() };

export { notificationBuilder, NotificationBuilder };
