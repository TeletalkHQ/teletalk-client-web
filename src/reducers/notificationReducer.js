import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { notificationInitialActions } from "variables/initials/initialActions/notificationInitialActions";

const { errorNotificationInitialAction } = notificationInitialActions;

const notificationReducer = (
  state = initialStates.notificationState,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => mergePrevStateWithPayload({ state, payload });

    switch (type) {
      case errorNotificationInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(notificationReducer.name, error);
  }
};

export { notificationReducer };
