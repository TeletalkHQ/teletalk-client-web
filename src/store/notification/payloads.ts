import { NOTIFICATION_ACTION_TYPES } from "src/store/notification/types";
import { fields } from "src/store/fields";

const notificationActionPayloads = {
  [NOTIFICATION_ACTION_TYPES.NEW_NOTIFICATION]: fields.collection.notification,
};

export { notificationActionPayloads };
