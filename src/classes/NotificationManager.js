import { enqueueSnackbar, closeSnackbar } from "notistack";

class NotificationManager {
  constructor(notificationCreator, notificationEliminator) {
    this.notificationCreator = notificationCreator;
    this.notificationEliminator = notificationEliminator;
    this.notifications = [];
    this.initialNotificationObject = {
      show: false,
      description: "",
      errorCode: "",
      errorReason: "",
      message: "",
    };
  }

  submitErrorNotification(notificationObject = this.initialNotificationObject) {
    const { message } = notificationObject;
    enqueueSnackbar(message, { variant: "error" });
  }
}

const notificationManager = new NotificationManager(
  enqueueSnackbar,
  closeSnackbar
);

export { notificationManager, NotificationManager };
