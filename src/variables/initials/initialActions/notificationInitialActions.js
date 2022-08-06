import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  notificationState: { errorNotificationState },
} = initialStates;

const errorNotificationInitialAction = {
  payload: errorNotificationState,
  type: "ERROR_NOTIFICATION",
};

const notificationInitialActions = {
  errorNotificationInitialAction,
};

export { notificationInitialActions };
