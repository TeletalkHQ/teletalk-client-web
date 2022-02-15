import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	user: { loading, ...user },
} = INITIAL_STATE;

const userInitialActions = {
	userInitialAction: {
		type: "USER_DATA",
		payload: user,
	},
	phoneNumberInitialAction: {
		type: "PHONE_NUMBER_ONCHANGE",
		payload: { phoneNumber: user.phoneNumber },
	},
	verifyCodeInitialAction: {
		type: "VERIFY_CODE_ONCHANGE",
		payload: { verifyCode: user.verifyCode },
	},
	loadingInitialAction: {
		type: "LOADING",
		payload: { loading },
	},
};

export { userInitialActions };
