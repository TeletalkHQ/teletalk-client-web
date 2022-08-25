import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";
import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";
import { defaultTempState } from "variables/initials/initialStates/tempInitialState";

const {
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  messageInputInitialAction,
  phoneNumberInitialAction,
  resetTempStateInitialAction,
  selectedContactIdInitialAction,
  selectedCountryInitialAction,
  setMessagesInitialAction,
  verificationCodeInitialAction,
} = tempInitialActions;

const tempReducer = (
  state = initialStates.tempState,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => mergePrevStateWithPayload({ state, payload });

    switch (type) {
      case selectedContactIdInitialAction.type:
        return fn();

      case setMessagesInitialAction.type:
        return fn();

      case messageInputInitialAction.type:
        return fn();

      case countryCodeInitialAction.type:
        return fn();

      case countryNameInitialAction.type:
        return fn();

      case firstNameInitialAction.type:
        return fn();

      case lastNameInitialAction.type:
        return fn();

      case phoneNumberInitialAction.type:
        return fn();

      case selectedCountryInitialAction.type:
        return fn();

      case verificationCodeInitialAction.type:
        return fn();

      case resetTempStateInitialAction.type:
        return defaultTempState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(tempReducer.name, error);
  }
};

export { tempReducer };
