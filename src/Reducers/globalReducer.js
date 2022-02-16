import { globalInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { globalInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";
const {
	appDrawerInitialAction,
	backdropInitialAction,
	viewModeInitialAction,
	dialogInitialAction,
} = globalInitialActions;

const globalReducer = (state = globalInitialState, action = initialAction) => {
	const { payload, type } = action;

	const fn = () => newStateReplacer({ state, payload });

	try {
		switch (type) {
			case viewModeInitialAction.type:
				return fn();

			case backdropInitialAction.type:
				return fn();

			case appDrawerInitialAction.type:
				return fn();

			case dialogInitialAction.type:
				return fn();

			default:
				return state;
		}
	} catch (error) {
		console.log("globalReducer catch", error);
	}
};

export { globalReducer };
