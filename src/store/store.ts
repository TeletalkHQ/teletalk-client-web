import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { initialStates } from "src/store/initialStates";
import { payloads } from "src/store/payloads";
import { rootReducer } from "src/store/rootReducer";

const store = createStore(rootReducer, initialStates(), applyMiddleware(thunk));

export { store, initialStates, payloads };
