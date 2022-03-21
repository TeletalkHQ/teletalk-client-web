import { requester } from "~/Functions/Utils/requester";

const getUserChatsLastMessageApi = async (data) => {
  try {
    const response = await requester({
      //TODO requester things
      data,
      method: "POST",
      url: "chat/private/chats/last/message",
    });
    return response;
  } catch (error) {
    console.log("getUserChatsLastMessageApi catch", error);
  }
};
export { getUserChatsLastMessageApi };
