import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getAllChatMessagesAPI = async (data) => {
  try {
    const { getMessages, baseUrl } =
      StuffStore.templates.routerTemplates?.privateChatRouterTemplate;

    const response = await requester({
      data,
      method: getMessages.properties.method,
      url: `${baseUrl.properties.route}${getMessages.properties.route}`,
    });
    return response;
  } catch (error) {
    console.log("getAllChatMessagesAPI catch", error);
  }
};
export { getAllChatMessagesAPI };
