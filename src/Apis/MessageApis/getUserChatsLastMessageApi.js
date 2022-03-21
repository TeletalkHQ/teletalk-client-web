import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getUserChatsLastMessageApi = async (data) => {
  try {
    const {
      templates: {
        routerTemplates: {
          privateChatRouterTemplate: {
            baseUrl,
            chatsLastMessage: { route, method },
          },
        },
      },
    } = StuffStore;

    const response = await requester({
      data,
      method,
      url: `${baseUrl}${route}`,
    });

    return response;
  } catch (error) {
    console.log("getUserChatsLastMessageApi catch", error);
  }
};
export { getUserChatsLastMessageApi };
