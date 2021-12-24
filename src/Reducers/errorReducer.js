import { initialAction } from "~/Variables/constants/actionTypes";
import { error } from "~/Variables/constants/initialStates";

const otherReducer = (state = error, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = (newState) => ({ ...state, ...newState });

		switch (type) {
			case "ECONNABORTED":
				return stateMan({ welcome: payload });

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
