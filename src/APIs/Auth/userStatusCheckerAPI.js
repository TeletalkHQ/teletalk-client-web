import { requester } from "~/Functions/Utils/requester";

const userStatusCheckerAPI = () => {
	const response = requester({ method: "GET", url: "user/status/check" });

	return response;
};

export { userStatusCheckerAPI };
