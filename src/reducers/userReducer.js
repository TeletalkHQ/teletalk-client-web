import { newStateReplacer } from "functions/utilities/stateUtils/stateUtils";

import { userInitialActions } from "variables/constants/initials/initialActions/initialActions";
import { initialAction } from "variables/constants/initials/initialOptions/initialOptions";
import { initialState } from "variables/constants/initials/initialStates/initialStates";

const { userInitialAction } = userInitialActions;

const userReducer = (
  state = initialState.userInitialState,
  action = initialAction
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
