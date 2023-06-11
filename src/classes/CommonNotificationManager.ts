import { NotificationManager } from "~/classes/NotificationManager";

import { variables } from "~/variables";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification() {
    this.submitErrorNotification(variables.notification.errors.econnAborted);
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
