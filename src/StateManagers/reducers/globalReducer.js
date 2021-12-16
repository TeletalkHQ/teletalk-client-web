import { initialAction } from "~/Variables/constants/actionTypes";
import { globalInitialState } from "~/Variables/constants/initialStates";

const globalReducer = (state = globalInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case "VIEW_MODE_ONCHANGE":
				return stateMan({ viewMode: payload });

			//
			//
			default:
				return state;
		}
	} catch (error) {
		console.log("authReducer catch", error);
	}
};

export { globalReducer };
