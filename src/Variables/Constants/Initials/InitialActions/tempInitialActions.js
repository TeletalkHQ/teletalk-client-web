import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	temp: { messageInputText, selectedContact },
} = INITIAL_STATE;

const tempInitialActions = {
	contactSelectedInitialAction: {
		type: "CONTACT_SELECTED",
		payload: { selectedContact },
	},

	messageInputInitialAction: {
		type: "MESSAGE_INPUT_ONCHANGE",
		payload: { messageInputText },
	},
};

export { tempInitialActions };
