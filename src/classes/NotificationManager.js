import { enqueueSnackbar, closeSnackbar } from "notistack";

class NotificationManager {
  constructor(notificationCreator, notificationEliminator) {
    this.notificationCreator = notificationCreator;
    this.notificationEliminator = notificationEliminator;
    this.notifications = [];
    this.initialNotificationObject = {
      description: "",
      notificationCode: "",
      notificationReason: "",
      message: "",
    };
  }

  submitErrorNotification(notificationObject = this.initialNotificationObject) {
    const { message } = notificationObject;
    enqueueSnackbar(message, { variant: "error" });
  }

  submitSuccessNotification(
    notificationObject = this.initialNotificationObject
  ) {
    const { message } = notificationObject;
    enqueueSnackbar(message, { variant: "success" });
  }
}

const notificationManager = new NotificationManager(
  enqueueSnackbar,
  closeSnackbar
);

export { notificationManager, NotificationManager };
