import { createContext } from "react";

import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { initialStateWithoutInitialWord } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const MainContext = createContext({
  state: initialStateWithoutInitialWord,
  hooksOutput: {
    dispatch: (action = initialAction) => {},
  },
});

export { MainContext };
