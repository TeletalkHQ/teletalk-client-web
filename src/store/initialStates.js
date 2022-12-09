import { initialAuthState } from "store/auth/initialState";
import { initialGlobalState } from "store/global/initialState";
import { initialMessageState } from "store/message/initialState";
import { initialNotificationState } from "store/notification/initialState";
import { initialOtherState } from "store/other/initialState";
import { initialUserState } from "store/user/initialState";

const initialStates = () => ({
  auth: initialAuthState(),
  global: initialGlobalState(),
  message: initialMessageState(),
  notification: initialNotificationState(),
  other: initialOtherState(),
  user: initialUserState(),
});

export { initialStates };