import { actionCreator } from "functions/utilities/stateUtilities";
import { initialActions } from "variables/initials/actions";

const updatePrivateChatMessages = (
  payload = initialActions.updatePrivateChatMessages.payload
) => actionCreator(initialActions.updatePrivateChatMessages.type, payload);

const messageActions = { updatePrivateChatMessages };

export { messageActions };
