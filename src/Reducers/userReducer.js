import { userActions } from "~/Variables/constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/constants/Initials/InitialOptions/initialOptions";
import { userInitialState } from "~/Variables/constants/Initials/InitialStates/initialStates";

const { userAction, phoneNumberAction, verifyCodeAction, loadingAction } = userActions;

const userReducer = (state = userInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = () => ({ ...state, ...payload });

		switch (type) {
			case userAction.type:
				return stateMan();

			case phoneNumberAction.type:
				return stateMan();

			case verifyCodeAction.type:
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
