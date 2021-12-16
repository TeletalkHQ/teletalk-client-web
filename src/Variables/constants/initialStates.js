const otherInitialState = {
	welcome: {},
};

const authInitialState = {
	user: {
		cellphone: { phoneNumber: "", countryCode: "98", countryName: "iran" },
		verifyCode: "",
	},
	loading: false,
};

const globalInitialState = {
	viewMode: "signIn",
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
