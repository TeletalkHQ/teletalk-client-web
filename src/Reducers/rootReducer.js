import { combineReducers } from "~/Hooks/useThunkReducer";

import { userReducer } from "~/Reducers/userReducer";
import { notificationReducer } from "~/Reducers/notificationReducer";
import { globalReducer } from "~/Reducers/globalReducer";
import { otherReducer } from "~/Reducers/otherReducer";
import { tempReducer } from "~/Reducers/tempReducer";

const rootReducer = combineReducers({
	user: userReducer,
	error: notificationReducer,
	global: globalReducer,
	other: otherReducer,
	temp: tempReducer,
});

export { rootReducer };
