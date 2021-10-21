import { useEffect } from "react";
import { useState } from "react";

export function App() {
	const [state, setState] = useState("initialState");

	useEffect(() => {
		window.developer = () => console.log(state);
		console.log(state);
	}, []);

	return (
		<div>
			<header>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<hr />
				{/* <Test1 /> */}
				{/* <Test2 /> */}

				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
