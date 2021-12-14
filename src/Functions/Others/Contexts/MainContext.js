import { createContext } from "react";

import { INITIAL_STATE } from "~/Variables/constants/initialStates";

const MainContext = createContext({ state: INITIAL_STATE, dispatch: () => {} });

export { MainContext };
