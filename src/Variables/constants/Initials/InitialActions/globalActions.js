import { INITIAL_STATE } from "~/Variables/constants/Initials/InitialStates/initialStates";

const {
	global: { appDrawerState, backdropState, dialogState, viewMode },
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
	dialogAction: {
		type: "DIALOG_STATE_CHANGE",
		payload: dialogState,
	},
};

export { globalActions };
