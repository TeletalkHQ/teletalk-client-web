import { actionHandler } from "src/classes/ActionHandler";

import { NOTIFICATION_ACTION_TYPES } from "src/store/notification/types";

const newNotification = (payload) =>
  actionHandler(NOTIFICATION_ACTION_TYPES.NEW_NOTIFICATION, payload);

const notificationActions = {
  newNotification,
};

export { notificationActions };
