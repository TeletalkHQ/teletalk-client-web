import { errorInitialState } from "./errorInitialState";
import { globalInitialState } from "./globalInitialState";
import { otherInitialState } from "./otherInitialState";
import { tempInitialState } from "./tempInitialState";
import { userInitialState } from "./userInitialState";

const INITIAL_STATE = {
	otherState: otherInitialState,
	userState: userInitialState,
	globalState: globalInitialState,
	errorState: errorInitialState,
	tempState: tempInitialState,
};

const initialState = () => INITIAL_STATE;

export { INITIAL_STATE, initialState };
