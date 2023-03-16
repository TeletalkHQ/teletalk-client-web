import { reducerBuilder } from "src/classes/ReducerBuilder";

import { AUTH_ACTION_TYPES } from "src/store/auth/types";
import { initialAuthState } from "src/store/auth/initialState";

const authReducerCases = {
  [AUTH_ACTION_TYPES.COUNTRY_CODE_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.COUNTRY_NAME_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.FIRST_NAME_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.LAST_NAME_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.PHONE_NUMBER_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.RESET_AUTH_STATE]: initialAuthState,

  [AUTH_ACTION_TYPES.SELECTED_COUNTRY_ONCHANGE]: (payload) => payload,

  [AUTH_ACTION_TYPES.VERIFICATION_CODE_ONCHANGE]: (payload) => payload,
};

const authReducer = reducerBuilder
  .create()
  .reducerName("authReducer")
  .reducerCases(authReducerCases)
  .initialState(initialAuthState())
  .build();

export { authReducer };
