import { errorActions } from "~/Variables/constants/actions";
import { initialAction } from "~/Variables/constants/Initials/initialOptions";
import { errorInitialState } from "~/Variables/constants/Initials/initialStates";

const errorReducer = (state = errorInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = (newState) => ({ ...state, ...newState });

		switch (type) {
			case errorActions.econnaborted.type:
				return stateMan({ error: payload });

			default:
				return state;
		}
	} catch (error) {
		console.log("errorReducer", error);
	}
};

export { errorReducer };
