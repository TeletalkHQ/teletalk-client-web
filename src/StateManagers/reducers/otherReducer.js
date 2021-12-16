import { initialAction } from "~/Variables/constants/actionTypes";
import { otherInitialState } from "~/Variables/constants/initialStates";

const otherReducer = (state = otherInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = (newState) => ({ ...state, ...newState });

		switch (type) {
			case "WELCOME":
				return stateMan({ welcome: payload });

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
