import { requester } from "~/Functions/Utils/requester";
import { userRouteTemplate } from "~/Templates/routeTemplates/userRouteTemplate";

const { logoutNormal } = userRouteTemplate;

const logoutAPI = async (data) => {
  try {
    const response = await requester({
      data,
      method: logoutNormal.properties.method,
      url: `${userRouteTemplate.baseRoute.properties.route}${logoutNormal.properties.route}`,
    });
    return response;
  } catch (error) {
    console.log("logoutAPI catch", error);
  }
};
export { logoutAPI };
