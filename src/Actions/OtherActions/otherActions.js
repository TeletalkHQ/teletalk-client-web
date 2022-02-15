import { actionCreator } from "~/Functions/Utils/actionCreator";

import { otherInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";

const { welcomeInitialAction } = otherInitialActions;

const welcomeAction = (payload = welcomeInitialAction.payload) =>
	actionCreator(welcomeInitialAction.type, payload);

export { welcomeAction };
