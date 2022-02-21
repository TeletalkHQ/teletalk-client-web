import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const globalInitialState = {
	appDrawerState: {
		anchor: {
			bottom: false,
			left: false,
			right: false,
			top: false,
		},
		currentAnchor: "left",
	},
	backdropState: {
		color: "#fff",
		open: true,
		progressColor: "inherit",
	},
	dialogState: {
		addNewContact: {
			open: false,
		},
		contacts: {
			open: false,
		},
		logout: {
			open: false,
		},
	},
	loadingState: {
		loading: false,
	},
	onlineStatus: {
		isOnline: window?.navigator.onLine,
		ping: 0,
	},
	viewMode: INITIAL_VIEW_MODE.signIn,
};

export { globalInitialState };
