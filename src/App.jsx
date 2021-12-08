import { useEffect } from "react";

export function App() {
	useEffect(() => {
		fetch("https://teletalk-server.herokuapp.com/user/verify/signIn/normal", {
			method: "POST",
			// headers: {
			// 	Authorization:
			// 		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWxscGhvbmUiOnsicGhvbmVOdW1iZXIiOiIxMDEyNzAwNDcwIiwiY291bnRyeUNvZGUiOiI5OCIsImNvdW50cnlOYW1lIjoiaXIifSwicHJpdmF0ZUlEIjoic0hEZXBwVUZ4c3dKQi1wdDJ6RDJnazB4SlZ2enpQIiwiaWF0IjoxNjM3OTIzNjY2fQ.MKymwG1fZ5pmXuMkJns094oHpyKfvGYYi760_Is0ZJw",
			// 	"Content-Type": "application/json",
			// },
			// body: {
			// 	privateID: "Ct5EViJCh4t0EH7KZHP2pHLTQ3-7euYdM9o",
			// }
			headers: {
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWxscGhvbmUiOnsicGhvbmVOdW1iZXIiOiIxMDEyNzAwNDcwIiwiY291bnRyeUNvZGUiOiI5OCIsImNvdW50cnlOYW1lIjoiaXIifSwiaWF0IjoxNjM3OTIzNjQ3fQ.DIwpqZItkI91v_lDDaLKs_zW3sXxaTjrfDN3rQQGuj4",
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res));

		window.developer = () => console.log();
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
