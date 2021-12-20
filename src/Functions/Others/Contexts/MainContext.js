import { createContext } from "react";

import { initialAction } from "~/Variables/constants/initialOptions";
import { INITIAL_STATE } from "~/Variables/constants/initialStates";

const MainContext = createContext({
	state: INITIAL_STATE,
	hooksOutput: {
		dispatch: (action = initialAction) => {},
	},
});

export { MainContext };
