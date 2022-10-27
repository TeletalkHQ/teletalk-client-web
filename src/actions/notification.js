import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/actions";

const errorNotification = (
  payload = initialActions.errorNotification.payload
) => actionCreator(initialActions.errorNotification.type, payload);

const notificationActions = {
  errorNotification,
};

export { notificationActions };
