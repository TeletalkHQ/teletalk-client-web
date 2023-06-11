import { enqueueSnackbar } from "notistack";

import { Notification } from "~/types";

class NotificationManager {
  submitErrorNotification(notification: Notification) {
    const { message, reason } = notification;
    enqueueSnackbar(message || reason, { variant: "error" });
  }

  submitSuccessNotification(notification: Notification) {
    const { message, reason } = notification;
    enqueueSnackbar(message || reason, { variant: "success" });
  }
}

const notificationManager = new NotificationManager();

export { notificationManager, NotificationManager };
