import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	temp: { messageInputText, selectedContact, messages },
} = INITIAL_STATE;

const tempInitialActions = {
	contactSelectedInitialAction: {
		type: "CONTACT_SELECTED",
		payload: { selectedContact },
	},

	setMessagesInitialAction: {
		type: "SET_MESSAGES",
		payload: { messages },
	},

	messageInputInitialAction: {
		type: "MESSAGE_INPUT_ONCHANGE",
		payload: { messageInputText },
	},
};

export { tempInitialActions };
