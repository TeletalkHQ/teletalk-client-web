import { INITIAL_STATE } from "~/Variables/constants/Initials/initialStates";

const {
	auth: { userState, loading },
	global: { appDrawerState, backdropState, viewMode },
	other: { welcome },
	error: { error },
} = INITIAL_STATE;

const globalActions = {
	appDrawerState: {
		type: "APP_DRAWER_STATE_CHANGE",
		payload: appDrawerState,
	},
	backdropState: {
		type: "BACKDROP_STATE_CHANGE",
		payload: backdropState,
	},
	viewMode: {
		type: "VIEW_MODE_ONCHANGE",
		payload: { viewMode },
	},
};

const authActions = {
	userState: {
		type: "USER_DATA",
		payload: userState,
	},
	phoneNumber: {
		type: "PHONE_NUMBER_ONCHANGE",
		payload: { phoneNumber: userState.cellphone.phoneNumber },
	},
	verifyCode: {
		type: "VERIFY_CODE_ONCHANGE",
		payload: { verifyCode: userState.verifyCode },
	},
	loading: {
		type: "LOADING",
		payload: { loading },
	},
};

const otherActions = {
	welcome: {
		type: "WELCOME",
		payload: welcome,
	},
};

const errorActions = {
	econnaborted: {
		type: "ECONNABORTED",
		payload: { error },
	},
};

const actions = { globalActions, authActions, otherActions, errorActions };

export { actions, globalActions, authActions, otherActions, errorActions };
