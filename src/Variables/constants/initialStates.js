import jwtDecode from "jwt-decode";

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
	backdropState: { open: false,progressColor:"inherit",color:"#ff" },
};

const INITIAL_STATE = {
	other: otherInitialState,
	auth: authInitialState,
	global: globalInitialState,
};

const initialState = () => INITIAL_STATE;

const fn = () => {
	const token = localStorage.getItem("token");
	console.log(token);

	if (token) {
		const decodedToken = jwtDecode(token);

		if (decodedToken) {
			delete decodedToken.iat;

			authInitialState.user = decodedToken;
		}
	}
};

fn();

export {
	otherInitialState,
	INITIAL_STATE,
	authInitialState,
	globalInitialState,
	initialState,
};
