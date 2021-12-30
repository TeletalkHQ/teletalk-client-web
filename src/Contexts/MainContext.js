import { createContext } from "react";

import { initialAction } from "~/Variables/constants/Initials/initialOptions";
import { INITIAL_STATE } from "~/Variables/constants/Initials/initialStates";

const MainContext = createContext({
	state: INITIAL_STATE,
	hooksOutput: {
		dispatch: (action = initialAction) => {},
	},
});

export { MainContext };
