import { appOptions } from "classes/AppOptions";

import { mergePrevStateWithPayload } from "functions/utilities/stateUtils";

import { initialStates } from "variables/initials/initialStates/initialStates";
import { tempInitialActions } from "variables/initials/initialActions/tempInitialActions";

const {
  selectedContactIdInitialAction,
  messageInputInitialAction,
  setMessagesInitialAction,
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  phoneNumberInitialAction,
  selectedCountryInitialAction,
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

      default:
        return state;
    }
  } catch (error) {
    console.log("tempReducer catch", error);
  }
};

export { tempReducer };
