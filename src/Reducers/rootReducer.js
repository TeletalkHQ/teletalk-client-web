import { combineReducers } from "~/Hooks/useThunkReducer";

import { authReducer } from "~/Reducers/authReducer";
import { errorReducer } from "~/Reducers/errorReducer";
import { globalReducer } from "~/Reducers/globalReducer";
import { otherReducer } from "~/Reducers/otherReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	error: errorReducer,
	global: globalReducer,
	other: otherReducer,
});

export { rootReducer };
