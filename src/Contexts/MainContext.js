import { createContext } from "react";

import { initialAction } from "~/Variables/constants/Initials/InitialOptions/initialOptions";
import { INITIAL_STATE } from "~/Variables/constants/Initials/InitialStates/initialStates";

const MainContext = createContext({
	state: INITIAL_STATE,
	hooksOutput: {
		dispatch: (action = initialAction) => {},
	},
});

export { MainContext };
