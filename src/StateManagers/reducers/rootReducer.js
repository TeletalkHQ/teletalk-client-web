import { combineReducers } from "~/Functions/Hooks/useThunkReducer";

import { otherReducer, authReducer, globalReducer } from "~/StateManagers/index";

const rootReducer = combineReducers({
	auth: authReducer,
	other: otherReducer,
	global: globalReducer,
});

export { rootReducer };
