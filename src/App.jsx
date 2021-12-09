import { useEffect, useMemo } from "react";

import useThunkReducer from "~/Functions/Hooks/useThunkReducer";

import { reducer } from "~/Functions/StateManagers/reducer";
import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";

import { welcomeAPI } from "~/Functions/APIs/Others/welcomeAPI";

import { INITIAL_STATE } from "~/Variables/constants/others";
let x = 0;
export function App() {
	const [state, dispatch] = useThunkReducer(reducer, INITIAL_STATE);

	useMemo(() => {
		console.log("dispatchInjector useMemo");

		dispatchInjector({ dispatch });
	}, [dispatch]);

	useEffect(() => {
		// welcomeAPI();
		console.log(state);
		// setTimeout(() => {
		// 	dispatch({ type: "test", value: "test" });
		// }, 1);
		// setTimeout(() => {
		// 	console.log(state);
		// }, 2000);
		// dispatch({ type: "test", value: "test" });
	}, [state]);

	const handleClick = () => (dispatch, getState) => {
		const state = getState();
		console.log(state);

		dispatch({ type: "test", value: ++x });
	};
	const asyncClick = () => async (dispatch, getState) => {
		setTimeout(() => {
			dispatch({ type: "test", value: ++x });
			console.log(x);
		}, 8000);
	};

	return (
		<div>
			<header>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>

				<hr />
				<button onClick={() => dispatch(handleClick())}>Click me!</button>
				<button onClick={() => dispatch(asyncClick())}>Click me async!</button>
				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
