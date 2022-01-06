import { INITIAL_STATE } from "~/Variables/constants/Initials/InitialStates/initialStates";

const {
	error: { error },
} = INITIAL_STATE;

const errorActions = {
	econnabortedAction: {
		type: "ECONNABORTED",
		payload: { error },
	},
};

export { errorActions };
