import { useMemo } from "react";

import MainContainer from "~/Components/MainContainer/MainContainer";

import { otherReducer, authReducer } from "~/Functions/StateManagers/index";
import { combineReducers, useThunkReducer } from "~/Functions/Hooks/useThunkReducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";
import { MainContext } from "~/Functions/Others/Contexts/MainContext";

import { INITIAL_STATE } from "~/Variables/constants/initialStates";

const rootReducer = combineReducers({
	auth: authReducer,
	other: otherReducer,
});

export function App() {
	const [state = INITIAL_STATE, dispatch] = useThunkReducer(rootReducer, INITIAL_STATE);

	useMemo(() => {
		console.log("dispatchInjector useMemo");
		dispatchInjector({ dispatch });
	}, [dispatch]);

	console.log(state);
	//
	return (
		<MainContext.Provider value={{ state, dispatch }}>
			<MainContainer />
		</MainContext.Provider>
	);
}
