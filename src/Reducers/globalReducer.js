import { globalInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { globalInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";

const {
	appDrawerInitialAction,
	backdropInitialAction,
	viewModeInitialAction,
	dialogInitialAction,
} = globalInitialActions;

const globalReducer = (state = globalInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = () => ({ ...state, ...payload });

	try {
		switch (type) {
			case viewModeInitialAction.type:
				return stateMan();

			case backdropInitialAction.type:
				return stateMan();

			case appDrawerInitialAction.type:
				return stateMan();

			case dialogInitialAction.type:
				return stateMan();

			default:
				return state;
		}
	} catch (error) {
		console.log("globalReducer catch", error);
	}
};

export { globalReducer };
