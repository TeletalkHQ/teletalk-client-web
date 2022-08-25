import { actionCreator } from "functions/utilities/stateUtils";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  notificationInitialActions: { errorNotificationInitialAction },
} = initialActions;

const errorNotificationAction = (
  payload = errorNotificationInitialAction.payload
) => actionCreator(errorNotificationInitialAction.type, payload);

const notificationActions = {
  errorNotificationAction,
};

export { notificationActions };
