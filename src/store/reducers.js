import { authReducer } from "store/auth/reducer";
import { globalReducer } from "store/global/reducer";
import { messageReducer } from "store/message/reducer";
import { notificationReducer } from "store/notification/reducer";
import { otherReducer } from "store/other/reducer";
import { userReducer } from "store/user/reducer";

const reducers = {
  auth: authReducer,
  global: globalReducer,
  message: messageReducer,
  notification: notificationReducer,
  other: otherReducer,
  user: userReducer,
};

export { reducers };
