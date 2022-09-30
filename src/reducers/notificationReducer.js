import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates";
import { initialActions } from "variables/initials/initialActions";

const notificationReducer = (
  state = initialStates.notification,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const reducerCase = notificationReducerCases[type];

    if (reducerCase) {
      return reducerCase(state, payload);
    }

    return state;
  } catch (error) {
    printCatchError(notificationReducer.name, error);
  }
};
const fn = (state, payload) => mergePrevStateWithPayload({ state, payload });

const notificationReducerCases = {
  [initialActions.errorNotification.type]: (state, payload) =>
    fn(state, payload),
};

export { notificationReducer };
