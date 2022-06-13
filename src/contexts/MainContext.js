import { createContext } from "react";

import { initialAction } from "~/variables/constants/initials/initialOptions/initialOptions";
import { initialStateWithoutInitialWord } from "~/variables/constants/initials/initialStates/initialStates";

const MainContext = createContext({
  state: initialStateWithoutInitialWord,
  hooksOutput: {
    dispatch: (action = initialAction) => {},
  },
});

export { MainContext };
