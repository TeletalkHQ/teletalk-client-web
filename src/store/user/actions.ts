import { USER_ACTION_TYPES } from "~/store/user/types";

const updateAllUserData = (payload) =>
  actionHandler(USER_ACTION_TYPES.UPDATE_ALL_USER_DATA, payload);

const updateAllUserContacts = (payload) =>
  actionHandler(USER_ACTION_TYPES.UPDATE_USER_CONTACTS, payload);

const resetUserState = () => actionHandler(USER_ACTION_TYPES.RESET_USER_STATE);

const userActions = {
  resetUserState,
  updateAllUserContacts,
  updateAllUserData,
};

export { userActions };
