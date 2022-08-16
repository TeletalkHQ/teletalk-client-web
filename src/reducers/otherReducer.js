import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { otherInitialActions } from "variables/initials/initialActions/otherInitialActions";

const {
  getCountriesInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
} = otherInitialActions;

const otherReducer = (
  state = initialStates.otherState,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => mergePrevStateWithPayload({ state, payload });

    switch (type) {
      case welcomeInitialAction.type:
        return fn();

      case getCountriesInitialAction.type:
        return fn();

      case selectContactInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("otherReducer catch", error);
  }
};

export { otherReducer };
