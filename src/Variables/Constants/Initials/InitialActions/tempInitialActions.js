import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const {
	temp: { messageInputText, messages, onlineStatus, selectedContact },
} = INITIAL_STATE;

const contactSelectedInitialAction = {
	type: "CONTACT_SELECTED",
	payload: { selectedContact },
};

const messageInputInitialAction = {
	type: "MESSAGE_INPUT_ONCHANGE",
	payload: { messageInputText },
};

const onlineStatusInitialAction = {
	type: "ONLINE_STATUS",
	payload: { onlineStatus },
};

const setMessagesInitialAction = {
	type: "SET_MESSAGES",
	payload: { messages },
};

const tempInitialActions = {
	contactSelectedInitialAction,
	messageInputInitialAction,
	onlineStatusInitialAction,
	setMessagesInitialAction,
};

export { tempInitialActions };
