import { authActions } from "~/Variables/constants/initialActions";
import { initialAction } from "~/Variables/constants/Initials/initialOptions";
import { authInitialState } from "~/Variables/constants/Initials/initialStates";

const { userAction, phoneNumberAction, verifyCodeAction, loadingAction } = authActions;

const authReducer = (state = authInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case userAction.type:
				return stateMan({ userState: { ...state.userState, ...payload } });

			case phoneNumberAction.type:
				return stateMan({
					userState: {
						...state.userState,
						cellphone: { ...state.userState.cellphone, ...payload },
					},
				});

			case verifyCodeAction.type:
				return stateMan({
					userState: {
						...state.userState,
						...payload,
					},
				});

			case loadingAction.type:
				return stateMan({ ...payload });
			//
			//
			default:
				return state;
		}
	} catch (error) {
		console.log("authReducer catch", error);
	}
};

export { authReducer };
