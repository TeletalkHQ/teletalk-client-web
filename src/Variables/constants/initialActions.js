import { INITIAL_STATE } from "~/Variables/constants/Initials/initialStates";

const {
	auth: { userState, loading },
	global: { appDrawerState, backdropState, viewMode },
	other: { welcome },
	error: { error },
} = INITIAL_STATE;

const globalActions = {
	appDrawerAction: {
		type: "APP_DRAWER_STATE_CHANGE",
		payload: appDrawerState,
	},
	backdropAction: {
		type: "BACKDROP_STATE_CHANGE",
		payload: backdropState,
	},
	viewModeAction: {
		type: "VIEW_MODE_ONCHANGE",
		payload: { viewMode },
	},
};

const authActions = {
	userAction: {
		type: "USER_DATA",
		payload: userState,
	},
	phoneNumberAction: {
		type: "PHONE_NUMBER_ONCHANGE",
		payload: { phoneNumber: userState.cellphone.phoneNumber },
	},
	verifyCodeAction: {
		type: "VERIFY_CODE_ONCHANGE",
		payload: { verifyCode: userState.verifyCode },
	},
	loadingAction: {
		type: "LOADING",
		payload: { loading },
	},
};

const otherActions = {
	welcomeAction: {
		type: "WELCOME",
		payload: welcome,
	},
};

const errorActions = {
	econnabortedAction: {
		type: "ECONNABORTED",
		payload: { error },
	},
};

const actions = { globalActions, authActions, otherActions, errorActions };

export { actions, globalActions, authActions, otherActions, errorActions };
