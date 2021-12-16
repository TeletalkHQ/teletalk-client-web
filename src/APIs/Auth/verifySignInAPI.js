import { requester } from "~/Functions/Utils/requester";

const verifySignInAPI = (data) => {
	const response = requester({
		data,
		method: "POST",
		url: "/user/verify/signIn/normal",
	});

	return response;
};

export { verifySignInAPI };
