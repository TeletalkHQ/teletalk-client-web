import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
