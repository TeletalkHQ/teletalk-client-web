import { notifications } from "variables/others/notifications";

import {
  notificationManager,
  NotificationManager,
} from "classes/NotificationManager";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification(error) {
    //TODO Move this if out
    if (!window?.navigator?.onLine || error?.code === "ECONNABORTED") {
      notificationManager.submitErrorNotification(
        notifications.localErrors.ECONNABORTED
      );
    }
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
