import { appOptions } from "classes/AppOptions";

import { newStateReplacer } from "functions/utilities/stateUtils";

import { userInitialActions } from "variables/initials/initialActions/userInitialActions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const { userInitialAction } = userInitialActions;

const userReducer = (
  state = initialStates.userState,
  action = appOptions.options.actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case userInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("userReducer catch", error);
  }
};

export { userReducer };
