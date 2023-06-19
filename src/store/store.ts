import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { initialStates } from "~/store/initialStates";
import { payloads } from "~/store/payloads";
import { rootReducer } from "~/store/rootReducer";

const store = createStore(rootReducer, initialStates(), applyMiddleware(thunk));

export { store, initialStates, payloads };
