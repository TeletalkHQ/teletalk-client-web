import { initialStates } from "variables/initials/initialStates/initialStates";

const {
  notification: { errorNotificationState },
} = initialStates;

const errorNotification = {
  payload: errorNotificationState,
  type: "ERROR_NOTIFICATION",
};

const notificationInitialActions = {
  errorNotification,
};

export { notificationInitialActions };
