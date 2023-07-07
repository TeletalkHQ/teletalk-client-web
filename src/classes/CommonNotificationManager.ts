import { NotificationManager } from "~/classes/NotificationManager";
import { errors } from "~/variables/notification/error";

class CommonNotificationManager extends NotificationManager {
  submitAbortedConnectionNotification() {
    super.submitErrorNotification(errors.econnAborted);
  }
}

const commonNotificationManager = new CommonNotificationManager();

export { commonNotificationManager, CommonNotificationManager };
