import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	globalState: {
		appDrawerState,
		backdropState,
		dialogState,
		viewMode,
		onlineStatus,
		loadingState,
	},
} = INITIAL_STATE;

const loadingInitialAction = {
	type: "LOADING_STATE",
	payload: {
		loadingState,
	},
};

const onlineStatusInitialAction = {
	type: "ONLINE_STATUS",
	payload: { onlineStatus },
};

const appDrawerInitialAction = {
	type: "APP_DRAWER_STATE_CHANGE",
	payload: { appDrawerState },
};
const backdropInitialAction = {
	type: "BACKDROP_STATE_CHANGE",
	payload: { backdropState },
};
const viewModeInitialAction = {
	type: "VIEW_MODE_ONCHANGE",
	payload: { viewMode },
};
const dialogInitialAction = {
	type: "DIALOG_STATE_CHANGE",
	payload: { dialogState },
};

const globalInitialActions = {
	onlineStatusInitialAction,
	appDrawerInitialAction,
	backdropInitialAction,
	viewModeInitialAction,
	dialogInitialAction,
	loadingInitialAction,
};

export { globalInitialActions };
