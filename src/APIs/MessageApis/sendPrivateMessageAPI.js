import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { privateChatRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, sendMessage } = privateChatRouterTemplate;

const sendPrivateMessageAPI = async (data) => {
  const response = await requester({
    data,
    method: sendMessage.properties.method,
    url: `${baseRoute.properties.route}${sendMessage.properties.route}`,
  });

  return response;
};

export { sendPrivateMessageAPI };
