import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getUserChatsLastMessageApi = async (data) => {
  try {
    const {
      templates: {
        routerTemplates: {
          privateChatRouterTemplate: {
            baseUrl,
            chatsLastMessage: { properties: chatsLastMessage },
          },
        },
      },
    } = StuffStore;

    const response = await requester({
      data,
      method: chatsLastMessage.method,
      url: `${baseUrl.properties.route}${chatsLastMessage.route}`,
    });

    return response;
  } catch (error) {
    console.log("getUserChatsLastMessageApi catch", error);
  }
};

export { getUserChatsLastMessageApi };
