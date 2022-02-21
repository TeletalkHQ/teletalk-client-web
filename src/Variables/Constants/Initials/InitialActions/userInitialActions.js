import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const { user } = INITIAL_STATE;

const userInitialActions = {
	userInitialAction: {
		payload: user,
		type: "USER_DATA",
	},
};

export { userInitialActions };
