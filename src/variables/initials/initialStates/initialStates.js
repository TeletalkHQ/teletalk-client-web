import { globalInitialState } from "variables/initials/initialStates/globalInitialState";
import { notificationInitialState } from "variables/initials/initialStates/notificationInitialState";
import { otherInitialState } from "variables/initials/initialStates/otherInitialState";
import { tempInitialState } from "variables/initials/initialStates/tempInitialState";
import { userInitialState } from "variables/initials/initialStates/userInitialState";

const initialStates = {
  global: globalInitialState,
  notification: notificationInitialState,
  other: otherInitialState,
  temp: tempInitialState,
  user: userInitialState,
};

const getInitialState = () => initialStates;

export { initialStates, getInitialState };
