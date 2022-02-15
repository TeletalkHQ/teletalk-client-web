import { requester } from "~/Functions/Utils/requester";

const getUserChatsLastMessageAPI = async (data) => {
	try {
		const response = await requester({
			//TODO requester things
			data,
			method: "POST",
			url: "chat/private/chats/last/message",
		});
		return response;
	} catch (error) {
		console.log("getUserChatsLastMessageAPI catch", error);
	}
};
export { getUserChatsLastMessageAPI };
