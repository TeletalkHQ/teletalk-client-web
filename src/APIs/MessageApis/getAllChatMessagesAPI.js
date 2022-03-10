import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { getMessages, baseRoute } =
  StuffStore.templates.routerTemplates?.privateChatRouterTemplate;

const getAllChatMessagesAPI = async (data) => {
  try {
    const response = await requester({
      data,
      method: getMessages.properties.method,
      url: `${baseRoute.properties.route}${getMessages.properties.route}`,
    });
    return response;
  } catch (error) {
    console.log("getAllChatMessagesAPI catch", error);
  }
};
export { getAllChatMessagesAPI };
