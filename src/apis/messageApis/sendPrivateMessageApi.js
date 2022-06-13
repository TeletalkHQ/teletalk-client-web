import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

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
    logger.log("sendPrivateMessageApi catch", error);
    throw error;
  }
};
export { sendPrivateMessageApi };
