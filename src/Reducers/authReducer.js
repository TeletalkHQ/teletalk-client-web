import { initialAction } from "~/Variables/constants/actionTypes";
import { authInitialState } from "~/Variables/constants/initialStates";

const authReducer = (state = authInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case "USER_DATA":
				return stateMan({ user: { ...state.user, ...payload } });

			case "PHONE_NUMBER_ONCHANGE":
				return stateMan({
					user: {
						...state.user,
						cellphone: { ...state.user.cellphone, phoneNumber: payload },
					},
				});

			case "VERIFY_CODE_ONCHANGE":
				return stateMan({
					user: {
						...state.user,
						verifyCode: payload,
					},
				});

			case "LOADING":
				return stateMan({ loading: payload });
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
