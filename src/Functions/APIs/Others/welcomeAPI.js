const { requester } = require("~/Functions/Utils/requester");

const welcomeAPI = async () => {
	const response = await requester({
		url: "/",
	});

	console.log(response.data);

	return response;
};

export { welcomeAPI };
