import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtilities";
import { printCatchError } from "functions/utilities/otherUtilities";

import { defaultTempState } from "variables/initials/initialStates/tempInitialState";
import { initialActions } from "variables/initials/initialActions/initialActions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const tempReducer = (
  state = initialStates.temp,
  action = appOptions.getOptions().actionOptions
) => {
  try {
    const { payload, type } = action;

    const fn = () => mergePrevStateWithPayload({ state, payload });

    switch (type) {
      case initialActions.selectedContactId.type:
        return fn();

      case initialActions.setMessages.type:
        return fn();

      case initialActions.messageInputOnChange.type:
        return fn();

      case initialActions.countryCodeOnChange.type:
        return fn();

      case initialActions.countryNameOnChange.type:
        return fn();

      case initialActions.firstNameOnChange.type:
        return fn();

      case initialActions.lastNameOnChange.type:
        return fn();

      case initialActions.phoneNumberOnChange.type:
        return fn();

      case initialActions.selectedCountry.type:
        return fn();

      case initialActions.verificationCodeOnChange.type:
        return fn();

      case initialActions.resetTempState.type:
        return defaultTempState();

      default:
        return state;
    }
  } catch (error) {
    printCatchError(tempReducer.name, error);
  }
};

export { tempReducer };
