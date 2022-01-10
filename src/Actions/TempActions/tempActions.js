import { actionCreator } from "~/Functions/Utils/actionCreator";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const { contactSelectedInitialAction, messageInputInitialAction } = tempInitialActions;

const contactClickAction = (payload = contactSelectedInitialAction.payload) =>
	actionCreator(contactSelectedInitialAction.type, payload);

const messageInputOnChangeAction = (payload = messageInputInitialAction.payload) =>
	actionCreator(messageInputInitialAction.type, payload);

const tempActions = { contactClickAction, messageInputOnChangeAction };

export { contactClickAction, messageInputOnChangeAction, tempActions };
