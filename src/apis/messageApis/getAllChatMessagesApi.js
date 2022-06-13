import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const getAllChatMessagesApi = async (data) => {
  try {
    const {
      privateChatRouterTemplate: { getMessages, baseUrl },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, getMessages),
    });

    return response;
  } catch (error) {
    logger.log("getAllChatMessagesApi catch", error);
    throw error;
  }
};

export { getAllChatMessagesApi };
