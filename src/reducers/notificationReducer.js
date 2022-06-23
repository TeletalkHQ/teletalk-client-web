import { newStateReplacer } from "functions/utilities/stateUtils";

import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { initialStates } from "variables/initials/initialStates/initialStates";
import { errorInitialActions } from "variables/initials/initialActions/errorInitialActions";

const { econnabortedAction } = errorInitialActions;

const notificationReducer = (
  state = initialStates.errorState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case econnabortedAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("notificationReducer", error);
  }
};

export { notificationReducer };
