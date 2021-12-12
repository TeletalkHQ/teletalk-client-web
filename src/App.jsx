import { useMemo } from "react";

import MainContainer from "~/Components/MainContainer/MainContainer";

import { reducer } from "~/Functions/StateManagers/reducer";
import { useThunkReducer } from "~/Functions/Hooks/useThunkReducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";
import { MainContext } from "~/Functions/Others/Contexts/Contexts";

import { INITIAL_STATE } from "~/Variables/constants/initialState";

export function App() {
	const [state, dispatch] = useThunkReducer(reducer, INITIAL_STATE);

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
