const { actionCreator } = require("functions/utilities/stateUtils");

const { actions } = require("variables/initials/initialActions/initialActions");

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
