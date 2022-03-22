import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
    console.log("getAllChatMessagesApi catch", error);
    throw error;
  }
};

export { getAllChatMessagesApi };
