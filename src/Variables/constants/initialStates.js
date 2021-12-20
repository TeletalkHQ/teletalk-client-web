const otherInitialState = {
	welcome: {},
};

const authInitialState = {
	user: {
		cellphone: { phoneNumber: "", countryCode: "98", countryName: "iran" },
		verifyCode: "",
		mainToken: "",
		verifyToken: "",
	},
	loading: false,
};

const globalInitialState = {
	viewMode: "signIn",
	backdropState: { open: true, progressColor: "inherit", color: "#ff" },
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
