import { combineReducers } from "hooks/useThunkReducer/tools";

import { initialStates } from "store/initialStates";
import { payloads } from "store/payloads";
import { reducers } from "store/reducers";

const rootReducer = combineReducers(reducers);

const store = { rootReducer, initialStates, payloads };

export { store };
