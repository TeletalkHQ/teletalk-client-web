import { useMemo } from "react";

import MainContainer from "~/Components/MainContainer/MainContainer";

import { reducer } from "~/Functions/StateManagers/reducer";
import { combineReducers, useThunkReducer } from "~/Functions/Hooks/useThunkReducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";
import { MainContext } from "~/Functions/Others/Contexts/Contexts";

import { INITIAL_STATE } from "~/Variables/constants/initialState";

const rootReducer = combineReducers({
	main: reducer,
});

export function App() {
	const [state, dispatch] = useThunkReducer(rootReducer, INITIAL_STATE);

	useMemo(() => {
		console.log("dispatchInjector useMemo");
		dispatchInjector({ dispatch });
	}, [dispatch]);

	console.log(state);
	return (
		<MainContext.Provider value={{ state, dispatch }}>
			<MainContainer />
		</MainContext.Provider>
	);
}
