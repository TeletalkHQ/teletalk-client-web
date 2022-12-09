import { enqueueSnackbar, closeSnackbar } from "notistack";

class NotificationManager {
  constructor(notificationCreator, notificationEliminator) {
    this.notificationCreator = notificationCreator;
    this.notificationEliminator = notificationEliminator;
    this.notifications = [];
    this.defaultNotificationObject = {
      description: "",
      notificationCode: "",
      notificationReason: "",
      message: "",
    };
  }

  submitErrorNotification(notificationObject = this.defaultNotificationObject) {
    const { message, notificationReason } = notificationObject;
    enqueueSnackbar(message || notificationReason, { variant: "error" });
  }

  submitSuccessNotification(
    notificationObject = this.defaultNotificationObject
  ) {
    const { message, notificationReason } = notificationObject;
    enqueueSnackbar(message || notificationReason, { variant: "success" });
  }
}

const notificationManager = new NotificationManager(
  enqueueSnackbar,
  closeSnackbar
);

export { notificationManager, NotificationManager };
