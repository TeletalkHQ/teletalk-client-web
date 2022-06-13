import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

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
