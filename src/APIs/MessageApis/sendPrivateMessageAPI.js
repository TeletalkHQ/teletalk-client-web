import { requester } from "~/Functions/Utils/requester";
import { privateChatRouteTemplate } from "~/Templates/routeTemplates/privateChatRouteTemplate";

const { baseRoute, sendMessage } = privateChatRouteTemplate;

const sendPrivateMessageAPI = async (data) => {
  const response = await requester({
    data,
    method: sendMessage.properties.method,
    url: `${baseRoute.properties.route}${sendMessage.properties.route}`,
  });

  return response;
};

export { sendPrivateMessageAPI };
