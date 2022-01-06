import { userInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { userInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const { userInitialAction, phoneNumberInitialAction, verifyCodeInitialAction, loadingAction } =
	userInitialActions;

const userReducer = (state = userInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = () => ({ ...state, ...payload });

		switch (type) {
			case userInitialAction.type:
				return stateMan();

			case phoneNumberInitialAction.type:
				return stateMan();

			case verifyCodeInitialAction.type:
				return stateMan();

			case loadingAction.type:
				return stateMan();
			//
			//
			default:
				return state;
		}
	} catch (error) {
		console.log("userReducer catch", error);
	}
};

export { userReducer };
