import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	temp: { messages },
} = INITIAL_STATE;

const tempInitialActions = {
	selectedUserChat: {
		type: "SELECTED_CHAT_MESSAGES",
		payload: messages,
	},
};

export { tempInitialActions };
