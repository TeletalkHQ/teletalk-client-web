import { combineReducers } from "hooks/useThunkReducer";

import { globalReducer } from "reducers/global";
import { messageReducer } from "reducers/message/reducer";
import { notificationReducer } from "reducers/notification";
import { otherReducer } from "reducers/other";
import { tempReducer } from "reducers/temp";
import { userReducer } from "reducers/user";

const rootReducer = combineReducers({
  global: globalReducer,
  message: messageReducer,
  notification: notificationReducer,
  other: otherReducer,
  temp: tempReducer,
  user: userReducer,
});

export { rootReducer };
