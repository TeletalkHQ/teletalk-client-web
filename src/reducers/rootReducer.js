import { combineReducers } from "hooks/useThunkReducer";

import { globalReducer } from "reducers/globalReducer";
import { notificationReducer } from "reducers/notificationReducer";
import { otherReducer } from "reducers/otherReducer";
import { tempReducer } from "reducers/tempReducer";
import { userReducer } from "reducers/userReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  notification: notificationReducer,
  other: otherReducer,
  temp: tempReducer,
  user: userReducer,
});

export { rootReducer };
