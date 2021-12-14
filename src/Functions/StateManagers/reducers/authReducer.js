import { auth } from "~/Variables/constants/initialStates";

const initialAction = { type: "", payload: "" };

const authReducer = (state = auth, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case "USER_DATA":
				return stateMan({ user: payload });
			case "PHONE_NUMBER_ONCHANGE":
				return stateMan({
					user: {
						...state.user,
						cellphone: { ...state.user.cellphone, phoneNumber: payload },
					},
				});
			default:
				return state;
		}
	} catch (error) {}
};

export { authReducer };
