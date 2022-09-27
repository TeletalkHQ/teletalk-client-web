import { actionCreator } from "functions/utilities/stateUtilities";

import { initialActions } from "variables/initials/initialActions/initialActions";

const {
  userInitialActions: {
    addNewContactInitialAction,
    addNewMessageToChatInitialAction,
    updateAllChatMessagesInitialAction,
    updateAllUserDataInitialAction,
    updateUserContactsInitialAction,
    resetUserStateInitialAction,
  },
} = initialActions;

const addNewContactAction = (payload = addNewContactInitialAction.payload) =>
  actionCreator(addNewContactInitialAction.type, payload);

const addNewMessageToChatAction = (
  payload = addNewMessageToChatInitialAction.payload
) => actionCreator(addNewMessageToChatInitialAction.type, payload);

const updateAllChatMessagesAction = (
  payload = updateAllChatMessagesInitialAction.payload
) => actionCreator(updateAllChatMessagesInitialAction.type, payload);

const updateAllUserDataAction = (
  payload = updateAllUserDataInitialAction.payload
) => actionCreator(updateAllUserDataInitialAction.type, payload);

const updateAllUserContactsAction = (
  payload = updateUserContactsInitialAction.payload
) => actionCreator(updateUserContactsInitialAction.type, payload);

const resetUserState = () => actionCreator(resetUserStateInitialAction.type);

const userActions = {
  addNewContactAction,
  addNewMessageToChatAction,
  resetUserState,
  updateAllChatMessagesAction,
  updateAllUserContactsAction,
  updateAllUserDataAction,
};

export { userActions };
