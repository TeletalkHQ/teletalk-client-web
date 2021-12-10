import { INITIAL_STATE } from "~/Variables/constants/initialState";

const reducer = (state = INITIAL_STATE, action) => {
	try {
		console.log(action.type);

		switch (action.type) {
			case "test":
				return { ...state, hmmm: action.payload };

			case "sign":
				return { ...state, welcome: action.payload };

			case "cellphoneInput":
				return { ...state, cellphoneInput: action.payload };

			default:
				return state;
		}
	} catch (error) {}
};

export { reducer };
