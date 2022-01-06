import { errorInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { errorInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const { econnabortedAction } = errorInitialActions;

const errorReducer = (state = errorInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = () => ({ ...state, ...payload });

		switch (type) {
			case econnabortedAction.type:
				return stateMan();

			default:
				return state;
		}
	} catch (error) {
		console.log("errorReducer", error);
	}
};

export { errorReducer };
