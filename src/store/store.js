import { combineReducers } from "hooks/useThunkReducer";

import { authReducer } from "store/auth/reducer";
import { globalReducer } from "store/global/reducer";
import { messageReducer } from "store/message/reducer";
import { notificationReducer } from "store/notification/reducer";
import { otherReducer } from "store/other/reducer";
import { userReducer } from "store/user/reducer";

import { initialAuthState } from "store/auth/initialState";
import { initialGlobalState } from "store/global/initialState";
import { initialMessageState } from "store/message/initialState";
import { initialNotificationState } from "store/notification/initialState";
import { initialOtherState } from "store/other/initialState";
import { initialUserState } from "store/user/initialState";

import { authActionPayloads } from "store/auth/payloads";
import { globalActionPayloads } from "store/global/payloads";
import { messageActionPayloads } from "store/message/payloads";
import { notificationActionPayloads } from "store/notification/payloads";
import { otherActionPayloads } from "store/other/payloads";
import { userActionPayloads } from "store/user/payloads";

const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  message: messageReducer,
  notification: notificationReducer,
  other: otherReducer,
  user: userReducer,
});

const payloads = {
  auth: authActionPayloads,
  global: globalActionPayloads,
  message: messageActionPayloads,
  notification: notificationActionPayloads,
  other: otherActionPayloads,
  user: userActionPayloads,
};

const initialState = () => ({
  auth: initialAuthState(),
  global: initialGlobalState(),
  message: initialMessageState(),
  notification: initialNotificationState(),
  other: initialOtherState(),
  user: initialUserState(),
});

const store = { rootReducer, initialState, payloads };

export { store };
