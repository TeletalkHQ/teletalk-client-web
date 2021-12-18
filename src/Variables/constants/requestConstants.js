import { RUNTIME_MODE } from "~/Variables/constants/others";

const baseURL =
	RUNTIME_MODE === "production"
		? "https://teletalk-server.herokuapp.com"
		: "https://teletalk-server.herokuapp.com";
// : "http://localhost:8080"

export { baseURL };
