import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const {
  notificationInitialActions: { errorNotificationInitialAction },
} = actions;

const errorNotificationAction = (
  payload = errorNotificationInitialAction.payload
) => actionCreator(errorNotificationInitialAction.type, payload);

const notificationActions = {
  errorNotificationAction,
};

export { notificationActions };
