import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { defaultOtherState } from "variables/initials/initialStates/otherInitialState";
import { initialActions } from "variables/initials/initialActions/initialActions";

const otherReducer = (
  state = initialStates.other,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () =>
      mergePrevStateWithPayload({
        payload,
        state,
      });

    switch (type) {
      case initialActions.setWelcomeMessage.type:
        return fn();

      case initialActions.getCountries.type:
        return fn();

      case initialActions.selectContact.type:
        return fn();

      case initialActions.resetOtherState.type:
        return defaultOtherState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(otherReducer.name, error);
  }
};

export { otherReducer };
