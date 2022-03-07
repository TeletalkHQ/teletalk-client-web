import { requester } from "~/Functions/Utils/requester";
import { userRouteTemplate } from "~/Templates/routeTemplates/userRouteTemplate";

const {
  createNewUser: { properties: createNewUser },
} = userRouteTemplate;

const createNewUserAPI = async ({ token, ...data }) => {
  try {
    const response = await requester({
      data,
      method: createNewUser.method,
      url: `${userRouteTemplate.baseRoute.properties.route}${createNewUser.route}`,
      token,
    });
    return response;
  } catch (error) {
    console.log("createNewUserAPI catch", error);
  }
};
export { createNewUserAPI };
