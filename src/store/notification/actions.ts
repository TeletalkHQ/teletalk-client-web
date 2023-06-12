import { NOTIFICATION_ACTION_TYPES } from "~/store/notification/types";

const newNotification = (payload) =>
  actionHandler(NOTIFICATION_ACTION_TYPES.NEW_NOTIFICATION, payload);

const notificationActions = {
  newNotification,
};

export { notificationActions };
