import { newStateReplacer } from "functions/utilities/stateUtils";

import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { initialStates } from "variables/initials/initialStates/initialStates";
import { notificationInitialActions } from "variables/initials/initialActions/notificationInitialActions";

const { errorNotificationInitialAction } = notificationInitialActions;

// const calculateNotificationType = (notificationCode) => {
//   const [success, info, warning, error] = [
//     "success",
//     "info",
//     "warning",
//     "error",
//   ];
//   if (notificationCode - 5000 >= 0) return error;
//   if (notificationCode - 4000 >= 0) return error;
//   if (notificationCode - 3000 >= 0) return warning;
//   if (notificationCode - 2000 >= 0) return success;
//   if (notificationCode - 1000 >= 0) return info;
// };

const notificationReducer = (
  state = initialStates.notificationState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case errorNotificationInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("notificationReducer", error);
  }
};

export { notificationReducer };
