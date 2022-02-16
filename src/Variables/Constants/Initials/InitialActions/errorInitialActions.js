import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	error: { error },
} = INITIAL_STATE;

const errorInitialActions = {
	econnabortedAction: {
		type: "ECONNABORTED",
		payload: { error },
	},
};

export { errorInitialActions };
