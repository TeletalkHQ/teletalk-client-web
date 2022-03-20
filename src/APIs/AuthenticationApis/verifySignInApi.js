import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const verifySignInAPI = async ({ token, ...data }) => {
  try {
    const { userRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseRoute, verifySignInNormal } = userRouterTemplate;

    const response = requester({
      data,
      method: verifySignInNormal.properties.method,
      url: `${baseRoute.properties.route}${verifySignInNormal.properties.route}`,
      token,
    });

    return response;
  } catch (error) {
    console.log("apiName catch", error);
  }
};

export { verifySignInAPI };