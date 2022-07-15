const {
  initialStates,
} = require("variables/initials/initialStates/initialStates");

const {
  notificationState: { errorNotificationState },
} = initialStates;

const notificationInitialActions = {
  errorNotificationInitialAction: {
    type: "ERROR_NOTIFICATION",
    payload: errorNotificationState,
  },
};

export { notificationInitialActions };
