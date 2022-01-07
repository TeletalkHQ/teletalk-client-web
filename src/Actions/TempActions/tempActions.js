import { actionCreator } from "~/Functions/Utils/actionCreator";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const { contactSelected } = tempInitialActions;

const contactClickAction = (payload = contactSelected.payload) =>
	actionCreator(contactSelected.type, payload);

export { contactClickAction };
