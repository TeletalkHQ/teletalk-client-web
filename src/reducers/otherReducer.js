import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { otherInitialActions } from "variables/initials/initialActions/otherInitialActions";
import { defaultOtherState } from "variables/initials/initialStates/otherInitialState";

const {
  getCountriesInitialAction,
  resetOtherStateInitialAction,
  selectContactInitialAction,
  welcomeInitialAction,
} = otherInitialActions;

const otherReducer = (
  state = initialStates.otherState,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () =>
      mergePrevStateWithPayload({
        payload,
        state,
      });

    console.log(fn());

    switch (type) {
      case welcomeInitialAction.type:
        return fn();

      case getCountriesInitialAction.type:
        return fn();

      case selectContactInitialAction.type:
        return fn();

      case resetOtherStateInitialAction.type:
        return defaultOtherState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(otherReducer.name, error);
  }
};

export { otherReducer };
