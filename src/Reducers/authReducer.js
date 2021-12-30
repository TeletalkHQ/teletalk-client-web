import { authActions } from "~/Variables/constants/actions";
import { initialAction } from "~/Variables/constants/Initials/initialOptions";
import { authInitialState } from "~/Variables/constants/Initials/initialStates";

const { userState, phoneNumber, verifyCode, loading } = authActions;

const authReducer = (state = authInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case userState.type:
				return stateMan({ userState: { ...state.userState, ...payload } });

			case phoneNumber.type:
				return stateMan({
					userState: {
						...state.userState,
						cellphone: { ...state.userState.cellphone, ...payload },
					},
				});

			case verifyCode.type:
				return stateMan({
					userState: {
						...state.userState,
						...payload,
					},
				});

			case loading.type:
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
