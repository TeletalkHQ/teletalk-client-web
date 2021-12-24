import { combineReducers } from "~/Hooks/useThunkReducer";

import { otherReducer, authReducer, globalReducer } from "~/Reducers/index";

const rootReducer = combineReducers({
	auth: authReducer,
	other: otherReducer,
	global: globalReducer,
});

export { rootReducer };
