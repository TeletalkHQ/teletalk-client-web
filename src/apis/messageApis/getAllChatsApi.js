import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const getAllChatsApi = async (data) => {
  try {
    const {
      privateChatRouterTemplate: { getAllChats, baseUrl },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, getAllChats),
    });

    return response;
  } catch (error) {
    logger.log("getAllChatsApi catch", error);
    throw error;
  }
};
export { getAllChatsApi };
