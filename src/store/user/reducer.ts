import { reducerBuilder } from "~/classes/ReducerBuilder";

import { initialUserState } from "~/store/user/initialState";
import { USER_ACTION_TYPES } from "~/store/user/types";

const userReducerCases = {
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
