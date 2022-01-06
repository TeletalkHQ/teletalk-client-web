import { combineReducers } from "~/Hooks/useThunkReducer";

import { userReducer } from "~/Reducers/userReducer";
import { errorReducer } from "~/Reducers/errorReducer";
import { globalReducer } from "~/Reducers/globalReducer";
import { otherReducer } from "~/Reducers/otherReducer";

const rootReducer = combineReducers({
	user: userReducer,
	error: errorReducer,
	global: globalReducer,
	other: otherReducer,
});

export { rootReducer };
