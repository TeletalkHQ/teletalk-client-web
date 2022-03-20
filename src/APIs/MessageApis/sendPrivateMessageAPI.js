import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const sendPrivateMessageAPI = async (data) => {
  try {
    const { privateChatRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseRoute, sendMessage } = privateChatRouterTemplate;

    const response = await requester({
      data,
      method: sendMessage.properties.method,
      url: `${baseRoute.properties.route}${sendMessage.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("sendPrivateMessageAPI catch", error);
  }
};
export { sendPrivateMessageAPI };
