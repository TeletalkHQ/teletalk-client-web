import { createContext } from "react";

import { initialOptions } from "~/Variables/constants/initialOptions";
import { INITIAL_STATE } from "~/Variables/constants/initialStates";

const MainContext = createContext({
	state: INITIAL_STATE,
	hooksOutput: {
		dispatch: (action = initialOptions) => {},
	},
});

export { MainContext };
