const { requester } = require("~/Functions/Utils/requester");

const welcomeAPI = async () => {
	try {
		const response = await requester({
			url: "/other/welcome",
		});

		return response;
	} catch (error) {
		console.log("welcomeAPI catch", error);
		throw error;
	}
};

export { welcomeAPI };
