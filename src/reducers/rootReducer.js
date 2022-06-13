import { combineReducers } from "~/hooks/useThunkReducer";

import { userReducer } from "~/reducers/userReducer";
import { notificationReducer } from "~/reducers/notificationReducer";
import { globalReducer } from "~/reducers/globalReducer";
import { otherReducer } from "~/reducers/otherReducer";
import { tempReducer } from "~/reducers/tempReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  errorState: notificationReducer,
  globalState: globalReducer,
  otherState: otherReducer,
  tempState: tempReducer,
});

export { rootReducer };
