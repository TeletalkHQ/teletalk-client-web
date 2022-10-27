import { createContext } from "react";

import { appOptions } from "classes/AppOptions";

import { getInitialState } from "variables/initials/states";

const MainContext = createContext({
  state: getInitialState(),
  hooksOutput: {
    dispatch: (action = appOptions.getOptions().actionOptions) => action,
    dispatchAsync: async (action = async () => {}) => {
      return await action();
    },
  },
});

export { MainContext };
