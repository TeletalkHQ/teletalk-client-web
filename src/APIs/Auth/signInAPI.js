import { requester } from "~/Functions/Utils/requester";

const signInAPI = (data) => {
	const response = requester({
		data,
		method: "POST",
		url: "/user/signIn/normal",
	});

	return response;
};

export { signInAPI };
