import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

const sendPrivateMessageApi = async (data) => {
  try {
    const {
      privateChatRouterTemplate: { baseUrl, sendMessage },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, sendMessage),
    });

    return response;
  } catch (error) {
    console.log("sendPrivateMessageApi catch", error);
    throw error;
  }
};
export { sendPrivateMessageApi };
