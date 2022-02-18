import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	user: { loading, ...user },
} = INITIAL_STATE;

const userInitialActions = {
	countryNameInitialAction: {
		type: "COUNTRY_NAME_ONCHANGE",
		payload: { countryName: user.countryName },
	},
	countryCodeInitialAction: {
		type: "COUNTRY_CODE_ONCHANGE",
		payload: { countryCode: user.countryCode },
	},
	loadingInitialAction: {
		type: "LOADING",
		payload: {
			loading,
		},
	},
	phoneNumberInitialAction: {
		payload: {
			phoneNumber: user.phoneNumber,
		},
		type: "PHONE_NUMBER_ONCHANGE",
	},
	userInitialAction: {
		payload: user,
		type: "USER_DATA",
	},
	verifyCodeInitialAction: {
		payload: {
			verifyCode: user.verifyCode,
		},
		type: "VERIFY_CODE_ONCHANGE",
	},
};

export { userInitialActions };
