import { combineReducers } from "~/Hooks/useThunkReducer";

import { userReducer } from "~/Reducers/userReducer";
import { errorReducer } from "~/Reducers/errorReducer";
import { globalReducer } from "~/Reducers/globalReducer";
import { otherReducer } from "~/Reducers/otherReducer";
import { tempReducer } from "~/Reducers/tempReducer";

const rootReducer = combineReducers({
	user: userReducer,
	error: errorReducer,
	global: globalReducer,
	other: otherReducer,
	temp: tempReducer,
});

export { rootReducer };
