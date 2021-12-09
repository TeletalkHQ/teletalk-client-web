import { RUNTIME_MODE } from "./others";

const baseURL =
	RUNTIME_MODE === "production"
		? "https://teletalk-server.herokuapp.com"
		: "http://localhost:8080";

export { baseURL };
