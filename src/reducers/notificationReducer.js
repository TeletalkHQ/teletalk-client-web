import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates";
import { initialActions } from "variables/initials/initialActions/initialActions";

const notificationReducer = (
  state = initialStates.notification,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => mergePrevStateWithPayload({ state, payload });

    switch (type) {
      case initialActions.errorNotification.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(notificationReducer.name, error);
  }
};

export { notificationReducer };
