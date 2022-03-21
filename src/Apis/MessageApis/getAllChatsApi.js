import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getAllChatsApi = async (data) => {
  try {
    const { privateChatRouterTemplate } = StuffStore.templates.routerTemplates;
    const { getAllChats, baseUrl } = privateChatRouterTemplate;

    const response = await requester({
      data,
      method: getAllChats.properties.method,
      URL: `${baseUrl.properties.route}${getAllChats.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("getAllChatsApi catch", error);
  }
};
export { getAllChatsApi };
