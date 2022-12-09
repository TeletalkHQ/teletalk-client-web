import { authReducer } from "src/store/auth/reducer";
import { globalReducer } from "src/store/global/reducer";
import { messageReducer } from "src/store/message/reducer";
import { notificationReducer } from "src/store/notification/reducer";
import { otherReducer } from "src/store/other/reducer";
import { userReducer } from "src/store/user/reducer";

const reducers = {
  auth: authReducer,
  global: globalReducer,
  message: messageReducer,
  notification: notificationReducer,
  other: otherReducer,
  user: userReducer,
};

export { reducers };
