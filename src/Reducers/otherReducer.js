import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { otherInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { otherInitialActions } from "~/Variables/Constants/Initials/InitialActions/otherInitialActions";

const {
	getCountriesInitialAction,
	selectContactInitialAction,
	selectedCountryInitialAction,
	welcomeInitialAction,
} = otherInitialActions;

const otherReducer = (state = otherInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const fn = () => newStateReplacer({ state, payload });

		switch (type) {
			case welcomeInitialAction.type:
				return fn();

			case getCountriesInitialAction.type:
				return fn();

			case selectContactInitialAction.type:
				return fn();

			case selectedCountryInitialAction.type:
				return fn();

			default:
				return state;
		}
	} catch (error) {
		console.log("otherReducer catch", error);
	}
};

export { otherReducer };
