import { createContext } from "react";

import { store } from "src/store/store";
import { variables } from "src/variables";

const MainContext = createContext({
  hooksOutput: {
    dispatch: (action = variables.common.object.action) => action,
    dispatchAsync: async (action = async () => {}) => {
      return await action();
    },
  },
  others: {
    getState: store.initialStates,
  },
  state: store.initialStates(),
});

export { MainContext };
