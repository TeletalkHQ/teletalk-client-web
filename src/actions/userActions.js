import { actionCreator } from "functions/utilities/stateUtils";

import { actions } from "variables/initials/initialActions/initialActions";

const {
  userInitialActions: {
    addNewContactInitialAction,
    addNewMessageToChatInitialAction,
    updateAllChatMessagesInitialAction,
    updateAllUserDataInitialAction,
    updateUserContactsInitialAction,
  },
} = actions;

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

const userActions = {
  addNewContactAction,
  addNewMessageToChatAction,
  updateAllChatMessagesAction,
  updateAllUserContactsAction,
  updateAllUserDataAction,
};

export { userActions };
