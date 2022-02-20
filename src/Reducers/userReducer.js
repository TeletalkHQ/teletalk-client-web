import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

import { userInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { userInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	countryCodeInitialAction,
	countryNameInitialAction,
	firstNameInitialAction,
	lastNameInitialAction,
	loadingInitialAction,
	phoneNumberInitialAction,
	userInitialAction,
	verifyCodeInitialAction,
} = userInitialActions;

const userReducer = (state = userInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const fn = () => newStateReplacer({ state, payload });

		switch (type) {
			case countryCodeInitialAction.type:
				return fn();

			case countryNameInitialAction.type:
				return fn();

			case firstNameInitialAction.type:
				return fn();

			case lastNameInitialAction.type:
				return fn();

			case loadingInitialAction.type:
				return fn();

			case phoneNumberInitialAction.type:
				return fn();

			case userInitialAction.type:
				return fn();

			case verifyCodeInitialAction.type:
				return fn();

			default:
				return state;
		}
	} catch (error) {
		console.log("userReducer catch", error);
	}
};

export { userReducer };
