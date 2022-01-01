const { requester } = require("~/Functions/Utils/requester");

const getContactsAPI = (data) => {
	try {
		const result = requester({ data, url: "/cellphone/get/contacts" });

		return result;
	} catch (error) {}
};

export { getContactsAPI };
