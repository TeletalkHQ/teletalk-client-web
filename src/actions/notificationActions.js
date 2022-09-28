import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  notificationInitialActions: { errorNotificationInitialAction },
} = initialActions;

const errorNotification = (payload = errorNotificationInitialAction.payload) =>
  actionCreator(errorNotificationInitialAction.type, payload);

const notificationActions = {
  errorNotification: errorNotification,
};

export { notificationActions };
