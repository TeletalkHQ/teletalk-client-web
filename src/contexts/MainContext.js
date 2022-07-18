import { createContext } from "react";

import { appOptions } from "classes/AppOptions";

import { initialStates } from "variables/initials/initialStates/initialStates";

const MainContext = createContext({
  state: initialStates,
  hooksOutput: {
    dispatch: (action = appOptions.options.actionOptions) => {},
  },
});

export { MainContext };
