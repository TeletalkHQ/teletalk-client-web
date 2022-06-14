import { errorInitialState } from "variables/constants/initials/initialStates/errorInitialState";
import { globalInitialState } from "variables/constants/initials/initialStates/globalInitialState";
import { otherInitialState } from "variables/constants/initials/initialStates/otherInitialState";
import { tempInitialState } from "variables/constants/initials/initialStates/tempInitialState";
import { userInitialState } from "variables/constants/initials/initialStates/userInitialState";

const initialState = {
  errorInitialState,
  globalInitialState,
  otherInitialState,
  tempInitialState,
  userInitialState,
};

const initialStateWithoutInitialWord = {
  errorState: errorInitialState,
  globalState: globalInitialState,
  otherState: otherInitialState,
  tempState: tempInitialState,
  userState: userInitialState,
};

const getInitialState = () => initialStateWithoutInitialWord;

export { initialState, initialStateWithoutInitialWord, getInitialState };
