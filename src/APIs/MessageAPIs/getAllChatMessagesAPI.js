import { requester } from "~/Functions/Utils/requester";

import { getMessages, baseRoute } from "~/Templates/routeTemplates/privateChatRouteTemplate";

const getAllChatMessagesAPI = async (data) => {
	try {
		const response = await requester({
			data,
			method: getMessages.properties.method,
			url: `${baseRoute.properties.route}${getMessages.properties.route}`,
		});
		return response;
	} catch (error) {
		console.log("getAllChatMessagesAPI catch", error);
	}
};
export { getAllChatMessagesAPI };
