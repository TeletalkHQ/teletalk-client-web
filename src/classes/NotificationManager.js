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

  calculateNotificationType = (notificationCode) => {
    const [success, info, warning, error] = [
      "success",
      "info",
      "warning",
      "error",
    ];

    if (notificationCode - 5000 >= 0) return error;
    if (notificationCode - 4000 >= 0) return error;
    if (notificationCode - 3000 >= 0) return warning;
    if (notificationCode - 2000 >= 0) return success;
    if (notificationCode - 1000 >= 0) return info;
  };

  submitErrorNotification(notificationObject = this.initialNotificationObject) {
    const { message, notificationReason } = notificationObject;
    enqueueSnackbar(message || notificationReason, { variant: "error" });
  }

  submitSuccessNotification(
    notificationObject = this.initialNotificationObject
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
