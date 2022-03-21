import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const sendPrivateMessageApi = async (data) => {
  try {
    const { privateChatRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseUrl, sendMessage } = privateChatRouterTemplate;

    const response = await requester({
      data,
      method: sendMessage.properties.method,
      url: `${baseUrl.properties.route}${sendMessage.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("sendPrivateMessageApi catch", error);
  }
};
export { sendPrivateMessageApi };
