import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	other: { welcome },
} = INITIAL_STATE;

const otherInitialActions = {
	welcomeInitialAction: {
		type: "WELCOME",
		payload: welcome,
	},
	selectContactAction: {
		type: "SELECT_CONTACT",
		payload: {},
	},
};

export { otherInitialActions };
