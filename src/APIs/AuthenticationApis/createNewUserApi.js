import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { userRouterTemplate } = StuffStore.templates.routerTemplates;

const createNewUserAPI = async ({ token, ...data }) => {
  const {
    createNewUser: { properties: createNewUser },
  } = userRouterTemplate;

  try {
    const response = await requester({
      data,
      method: createNewUser.method,
      url: `${userRouterTemplate.baseRoute.properties.route}${createNewUser.route}`,
      token,
    });
    return response;
  } catch (error) {
    console.log("createNewUserAPI catch", error);
  }
};
export { createNewUserAPI };
