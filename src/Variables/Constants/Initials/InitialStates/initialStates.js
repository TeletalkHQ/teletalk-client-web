import { errorInitialState } from "~/Variables/Constants/Initials/InitialStates/errorInitialState";
import { globalInitialState } from "~/Variables/Constants/Initials/InitialStates/globalInitialState";
import { otherInitialState } from "~/Variables/Constants/Initials/InitialStates/otherInitialState";
import { tempInitialState } from "~/Variables/Constants/Initials/InitialStates/tempInitialState";
import { userInitialState } from "~/Variables/Constants/Initials/InitialStates/userInitialState";

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
