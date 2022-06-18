import { errorInitialState } from "variables/initials/initialStates/errorInitialState";
import { globalInitialState } from "variables/initials/initialStates/globalInitialState";
import { otherInitialState } from "variables/initials/initialStates/otherInitialState";
import { tempInitialState } from "variables/initials/initialStates/tempInitialState";
import { userInitialState } from "variables/initials/initialStates/userInitialState";

const initialStates = {
  errorState: errorInitialState,
  globalState: globalInitialState,
  otherState: otherInitialState,
  tempState: tempInitialState,
  userState: userInitialState,
};

const getInitialState = () => initialStates;

export { initialStates, getInitialState };
