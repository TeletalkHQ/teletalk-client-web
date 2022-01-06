import { createContext } from "react";

import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const MainContext = createContext({
	state: INITIAL_STATE,
	hooksOutput: {
		dispatch: (action = initialAction) => {},
	},
});

export { MainContext };
