import { combineReducers } from "redux";

import { reducers } from "~/store/reducers";

const rootReducer = combineReducers(reducers);

export { rootReducer };
