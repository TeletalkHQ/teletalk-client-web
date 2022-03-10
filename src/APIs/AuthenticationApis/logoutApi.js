import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { userRouterTemplate } = StuffStore.templates.routerTemplates;
const { logoutNormal } = userRouterTemplate;

const logoutAPI = async (data) => {
  try {
    const response = await requester({
      data,
      method: logoutNormal.properties.method,
      url: `${userRouterTemplate.baseRoute.properties.route}${logoutNormal.properties.route}`,
    });
    return response;
  } catch (error) {
    console.log("logoutAPI catch", error);
  }
};
export { logoutAPI };
