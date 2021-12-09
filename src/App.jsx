import { useEffect, useMemo } from "react";

import useThunkReducer from "~/Functions/Hooks/useThunkReducer";

import { reducer } from "~/Functions/StateManagers/reducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";

import { welcomeAPI } from "~/Functions/APIs/Others/welcomeAPI";

import { INITIAL_STATE } from "~/Variables/constants/others";

export function App() {
	const [state, dispatch] = useThunkReducer(reducer, INITIAL_STATE);

	useMemo(() => {
		console.log("dispatchInjector useMemo");

		dispatchInjector({ dispatch });
	}, [dispatch]);

	useEffect(() => {
		welcomeAPI();
	}, []);

	return (
		<div>
			<header>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>

				<hr />
				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
