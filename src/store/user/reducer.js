import { reducerBuilder } from "src/classes/ReducerBuilder";

import { initialUserState } from "src/store/user/initialState";
import { USER_ACTION_TYPES } from "src/store/user/types";
import { userReducerHandlers } from "src/store/user/handlers";

const userReducerCases = {
  [USER_ACTION_TYPES.ADD_NEW_CONTACT]: userReducerHandlers.handleAddNewContact,

  [USER_ACTION_TYPES.UPDATE_USER_CONTACTS]:
    userReducerHandlers.handleUpdateAllContacts,

  [USER_ACTION_TYPES.UPDATE_ALL_USER_DATA]: (payload) => payload,

  [USER_ACTION_TYPES.RESET_USER_STATE]: initialUserState,
};

const userReducer = reducerBuilder
  .create()
  .reducerName("userReducer")
  .reducerCases(userReducerCases)
  .initialState(initialUserState())
  .build();

export { userReducer };
