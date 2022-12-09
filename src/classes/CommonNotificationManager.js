import { NotificationManager } from "src/classes/NotificationManager";

import { variables } from "src/variables";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification() {
    this.submitErrorNotification(variables.notification.error.ECONNABORTED);
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
