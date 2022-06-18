import { createContext } from "react";

import { initialAction } from "variables/initials/initialOptions/initialOptions";
import { initialStates } from "variables/initials/initialStates/initialStates";

const MainContext = createContext({
  state: initialStates,
  hooksOutput: {
    dispatch: (action = initialAction) => {},
  },
});

export { MainContext };
