const RUNTIME_MODE = process.env.NODE_ENV;

const baseURL =
	RUNTIME_MODE === "production"
		? "https://teletalk-server.herokuapp.com"
		: "http://localhost:8080";

export { RUNTIME_MODE, baseURL };
