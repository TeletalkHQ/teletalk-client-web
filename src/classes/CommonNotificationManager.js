import { NotificationManager } from "classes/NotificationManager";

import { notifications } from "variables/otherVariables/notifications";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification() {
    this.submitErrorNotification(notifications.localErrors.ECONNABORTED);
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
