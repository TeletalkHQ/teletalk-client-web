import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

const {
  contactSelectedInitialAction,
  messageInputInitialAction,
  setMessagesInitialAction,
  countryCodeInitialAction,
  countryNameInitialAction,
  firstNameInitialAction,
  lastNameInitialAction,
  phoneNumberInitialAction,
  selectedCountryInitialAction,
  verifyCodeInitialAction,
} = tempInitialActions;

const tempReducer = (
  state = initialState.tempInitialState,
  action = initialAction
) => {
  try {
    const { payload, type } = action;

    const fn = () => newStateReplacer({ state, payload });

    switch (type) {
      case contactSelectedInitialAction.type:
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

      case verifyCodeInitialAction.type:
        return fn();

      default:
        return state;
    }
  } catch (error) {
    console.log("tempReducer catch", error);
  }
};

export { tempReducer };
