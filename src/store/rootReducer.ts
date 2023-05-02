import { combineReducers } from "redux";

import { reducers } from "src/store/reducers";

const rootReducer = combineReducers(reducers);

export { rootReducer };
