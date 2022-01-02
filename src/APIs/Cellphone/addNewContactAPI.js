import { requester } from "~/Functions/Utils/requester";

const addNewContactAPI = (data) => {
	const result = requester({ url: "/cellphone/add/contact", method: "POST", data });

	return result;
};

export { addNewContactAPI };
