import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	global: { appDrawerState, backdropState, dialogState, viewMode },
} = INITIAL_STATE;

const globalInitialActions = {
	appDrawerInitialAction: {
		type: "APP_DRAWER_STATE_CHANGE",
		payload: { appDrawerState },
	},
	backdropInitialAction: {
		type: "BACKDROP_STATE_CHANGE",
		payload: { backdropState },
	},
	viewModeInitialAction: {
		type: "VIEW_MODE_ONCHANGE",
		payload: { viewMode },
	},
	dialogInitialAction: {
		type: "DIALOG_STATE_CHANGE",
		payload: { dialogState },
	},
};

export { globalInitialActions };
