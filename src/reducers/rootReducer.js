import { combineReducers } from "hooks/useThunkReducer";

import { userReducer } from "reducers/userReducer";
import { notificationReducer } from "reducers/notificationReducer";
import { globalReducer } from "reducers/globalReducer";
import { otherReducer } from "reducers/otherReducer";
import { tempReducer } from "reducers/tempReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  global: globalReducer,
  other: otherReducer,
  temp: tempReducer,
});

export { rootReducer };
