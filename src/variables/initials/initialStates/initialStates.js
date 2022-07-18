import { globalInitialState } from "variables/initials/initialStates/globalInitialState";
import { otherInitialState } from "variables/initials/initialStates/otherInitialState";
import { tempInitialState } from "variables/initials/initialStates/tempInitialState";
import { userInitialState } from "variables/initials/initialStates/userInitialState";
import { notificationInitialState } from "variables/initials/initialStates/notificationInitialState";

const initialStates = {
  globalState: globalInitialState,
  notificationState: notificationInitialState,
  otherState: otherInitialState,
  tempState: tempInitialState,
  userState: userInitialState,
};

const getInitialState = () => initialStates;

export { initialStates, getInitialState };
