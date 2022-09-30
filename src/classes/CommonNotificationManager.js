import { NotificationManager } from "classes/NotificationManager";

import { notifications } from "variables/notifications/notifications";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification() {
    this.submitErrorNotification(notifications.error.ECONNABORTED);
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
