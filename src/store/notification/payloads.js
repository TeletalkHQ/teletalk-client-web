import { NOTIFICATION_ACTION_TYPES } from "store/notification/types";
import { fields } from "store/fields";

const notificationActionPayloads = {
  [NOTIFICATION_ACTION_TYPES.ERROR_NOTIFICATION]:
    fields.collection.notification,
};

export { notificationActionPayloads };
