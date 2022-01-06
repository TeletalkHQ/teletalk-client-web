import { INITIAL_STATE } from "~/Variables/constants/Initials/InitialStates/initialStates";

const {
	other: { welcome },
} = INITIAL_STATE;

const otherActions = {
	welcomeAction: {
		type: "WELCOME",
		payload: welcome,
	},
	selectContactAction: {
		type: "SELECT_CONTACT",
		payload: {},
	},
};

export { otherActions };
