import { combineReducers } from "src/hooks/useThunkReducer/tools";

import { initialStates } from "src/store/initialStates";
import { payloads } from "src/store/payloads";
import { reducers } from "src/store/reducers";

const rootReducer = combineReducers(reducers);

const store = { rootReducer, initialStates, payloads };

export { store };
