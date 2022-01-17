import { actionCreator } from "~/Functions/Utils/actionCreator";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const { contactSelectedInitialAction, messageInputInitialAction, setMessagesInitialAction } =
	tempInitialActions;

const contactClickAction = (payload = contactSelectedInitialAction.payload) =>
	actionCreator(contactSelectedInitialAction.type, payload);

const setMessagesAction = (payload = setMessagesInitialAction.payload) =>
	actionCreator(setMessagesInitialAction.type, payload);

const messageInputOnChangeAction = (payload = messageInputInitialAction.payload) =>
	actionCreator(messageInputInitialAction.type, payload);

const tempActions = { contactClickAction, messageInputOnChangeAction, setMessagesAction };

export { tempActions, contactClickAction, messageInputOnChangeAction, setMessagesAction };
