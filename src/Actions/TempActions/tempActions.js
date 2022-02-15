import { actionCreator } from "~/Functions/Utils/actionCreator";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const {
	contactSelectedInitialAction,
	messageInputInitialAction,
	onlineStatusInitialAction,
	setMessagesInitialAction,
} = tempInitialActions;

const contactClickAction = (payload = contactSelectedInitialAction.payload) =>
	actionCreator(contactSelectedInitialAction.type, payload);

const messageInputOnChangeAction = (payload = messageInputInitialAction.payload) =>
	actionCreator(messageInputInitialAction.type, payload);

const onlineStatusOnChange = (payload = onlineStatusInitialAction.payload) =>
	actionCreator(tempInitialActions.onlineStatusInitialAction.type, payload);

const setMessagesAction = (payload = setMessagesInitialAction.payload) =>
	actionCreator(setMessagesInitialAction.type, payload);

const tempActions = { contactClickAction, messageInputOnChangeAction, setMessagesAction };

export {
	tempActions,
	contactClickAction,
	messageInputOnChangeAction,
	onlineStatusOnChange,
	setMessagesAction,
};
