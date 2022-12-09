import { initialStates } from "src/store/initialStates";
import { rootReducer } from "src/store/rootReducer";
import { payloads } from "src/store/payloads";

const store = { rootReducer, initialStates, payloads };

export { store };
