import { createContext } from "react";

import { appOptions } from "src/classes/AppOptions";

import { store } from "src/store/store";

const MainContext = createContext({
  hooksOutput: {
    dispatch: (action = appOptions.getOptions().actionOptions) => action,
    dispatchAsync: async (action = async () => {}) => {
      return await action();
    },
  },
  others: { getState: store.initialStates },
  state: store.initialStates(),
});

export { MainContext };
