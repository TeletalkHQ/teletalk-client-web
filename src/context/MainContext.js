import { createContext } from "react";

import { appOptions } from "classes/AppOptions";

import { store } from "store/store";

const MainContext = createContext({
  hooksOutput: {
    dispatch: (action = appOptions.getOptions().actionOptions) => action,
    dispatchAsync: async (action = async () => {}) => {
      return await action();
    },
  },
  others: { getState: store.initialState },
  state: store.initialState(),
});

export { MainContext };
