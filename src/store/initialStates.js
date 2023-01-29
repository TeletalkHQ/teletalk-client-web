import { initialAuthState } from "src/store/auth/initialState";
import { initialGlobalState } from "src/store/global/initialState";
import { initialMessageState } from "src/store/message/initialState";
import { initialNotificationState } from "src/store/notification/initialState";
import { initialOtherState } from "src/store/other/initialState";
import { initialSettingsState } from "src/store/settings/initialState";
import { initialUserState } from "src/store/user/initialState";

const initialStates = () => ({
  auth: initialAuthState(),
  global: initialGlobalState(),
  message: initialMessageState(),
  notification: initialNotificationState(),
  other: initialOtherState(),
  settings: initialSettingsState(),
  user: initialUserState(),
});

export { initialStates };
