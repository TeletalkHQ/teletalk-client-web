import { combineReducers } from "src/hooks/useThunkReducer/tools";

import { reducers } from "src/store/reducers";

const rootReducer = combineReducers(reducers);

export { rootReducer };
