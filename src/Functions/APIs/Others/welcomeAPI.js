const { requester } = require("~/Functions/Utils/requester");

const welcomeAPI = async () => {
	const data = new URLSearchParams("name", { name: "soheil" }).toString();

	const response = await requester({
		url: "/",
		data,
	});

	return response;
};

export { welcomeAPI };
