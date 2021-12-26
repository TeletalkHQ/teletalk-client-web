import { userInitializer } from "~/Functions/Helpers/userInitializer";

const otherInitialState = {
	welcome: {},
};

const authInitialState = {
	user: userInitializer(),
};

const globalInitialState = {
	viewMode: "signIn",
	backdropState: { open: true, progressColor: "inherit", color: "#ff" },
	appDrawerState: {
		anchor: { top: false, left: true, bottom: false, right: false },
		currentAnchor: "left",
	},
};

const INITIAL_STATE = {
	other: otherInitialState,
	auth: authInitialState,
	global: globalInitialState,
};

const initialState = () => INITIAL_STATE;

export {
	otherInitialState,
	INITIAL_STATE,
	authInitialState,
	globalInitialState,
	initialState,
};
