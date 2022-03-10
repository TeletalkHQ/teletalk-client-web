import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { privateChatRouterTemplate } = StuffStore.templates.routerTemplates;
const { getAllChats, baseRoute } = privateChatRouterTemplate;

const getAllChatsAPI = async (data) => {
  try {
    const response = await requester({
      data,
      method: getAllChats.properties.method,
      URL: `${baseRoute.properties.route}${getAllChats.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("getAllChatsAPI catch", error);
  }
};
export { getAllChatsAPI };
