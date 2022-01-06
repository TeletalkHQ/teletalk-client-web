import { INITIAL_STATE } from "~/Variables/constants/Initials/InitialStates/initialStates";

const {
	user: { loading, ...user },
} = INITIAL_STATE;

const userActions = {
	userAction: {
		type: "USER_DATA",
		payload: user,
	},
	phoneNumberAction: {
		type: "PHONE_NUMBER_ONCHANGE",
		payload: { phoneNumber: user.phoneNumber },
	},
	verifyCodeAction: {
		type: "VERIFY_CODE_ONCHANGE",
		payload: { verifyCode: user.verifyCode },
	},
	loadingAction: {
		type: "LOADING",
		payload: { loading },
	},
};

export { userActions };
