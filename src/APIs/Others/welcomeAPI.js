const { requester } = require("~/Functions/Utils/requester");

const welcomeAPI = async () => {
	const response = await requester({
		url: "/",
	});

	return response;
};

export { welcomeAPI };
