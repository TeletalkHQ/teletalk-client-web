import { requester } from "~/Functions/Utils/requester";

const signInAPI = ({ phoneNumber, countryCode, countryName }) => {
	const response = requester({
		data: {
			cellphone: {
				phoneNumber,
				countryCode,
				countryName,
			},
		},
		method: "POST",
		url: "/user/signIn/normal",
	});

	return response;
};

export { signInAPI };
