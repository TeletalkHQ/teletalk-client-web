import { errorInitialState } from "variables/initials/initialStates/errorInitialState";
import { globalInitialState } from "variables/initials/initialStates/globalInitialState";
import { otherInitialState } from "variables/initials/initialStates/otherInitialState";
import { tempInitialState } from "variables/initials/initialStates/tempInitialState";
import { userInitialState } from "variables/initials/initialStates/userInitialState";
import { notificationInitialState } from "variables/initials/initialStates/notificationInitialState";

const initialStates = {
  errorState: errorInitialState,
  globalState: globalInitialState,
  otherState: otherInitialState,
  tempState: tempInitialState,
  userState: userInitialState,
  notificationState: notificationInitialState,
};

const getInitialState = () => initialStates;

export { initialStates, getInitialState };
