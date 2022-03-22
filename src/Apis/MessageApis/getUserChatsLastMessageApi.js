import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

const getUserChatsLastMessageApi = async (data) => {
  try {
    const {
      templates: {
        routerTemplates: {
          privateChatRouterTemplate: { baseUrl, chatsLastMessage },
        },
      },
    } = StuffStore;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, chatsLastMessage),
    });

    return response;
  } catch (error) {
    logger.log("getUserChatsLastMessageApi catch", error);
  }
};

export { getUserChatsLastMessageApi };
