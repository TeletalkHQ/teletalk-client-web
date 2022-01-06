import { userInitializer } from "~/Functions/Helpers/userInitializer";

const otherInitialState = {
	welcome: { message: "" },
	onlineStatusCondition: !window.navigator.onLine,
	status: window.navigator.onLine,
};

const userInitialState = {
	...userInitializer(),
	loading: false,
};

const globalInitialState = {
	viewMode: "signIn",
	backdropState: { open: true, progressColor: "inherit", color: "#ff" },
	appDrawerState: {
		anchor: { top: false, left: false, bottom: false, right: false },
		currentAnchor: "left",
	},
	dialogState: {
		contacts: {
			open: false,
			dialogName: "contacts",
		},
		addContact: {
			open: false,
			dialogName: "addContact",
		},
	},
};

const errorInitialState = {
	error: "",
};

const INITIAL_STATE = {
	other: otherInitialState,
	user: userInitialState,
	global: globalInitialState,
	error: errorInitialState,
};

const initialState = () => INITIAL_STATE;

export {
	errorInitialState,
	globalInitialState,
	INITIAL_STATE,
	initialState,
	otherInitialState,
	userInitialState,
};
