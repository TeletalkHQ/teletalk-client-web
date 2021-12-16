import { useMemo } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MainContainer from "~/Components/MainContainer/MainContainer";

import { useThunkReducer } from "~/Functions/Hooks/useThunkReducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";
import { MainContext } from "~/Functions/Others/Contexts/MainContext";

import { rootReducer } from "~/StateManagers/index";

import { INITIAL_STATE } from "~/Variables/constants/initialStates";

import { baseTheme } from "~/Theme/baseTheme";

export function App() {
	const [state = INITIAL_STATE, dispatch] = useThunkReducer(rootReducer, INITIAL_STATE);

	useMemo(() => {
		console.log("dispatchInjector useMemo");
		dispatchInjector({ dispatch });
	}, [dispatch]);

	console.log(state);
	//
	return (
		<ThemeProvider theme={baseTheme}>
			<CssBaseline />
			<MainContext.Provider value={{ state, dispatch }}>
				<MainContainer />
			</MainContext.Provider>{" "}
		</ThemeProvider>
	);
}
