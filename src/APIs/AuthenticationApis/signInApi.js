import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const signInAPI = (data) => {
  try {
    const { userRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseUrl, signInNormal } = userRouterTemplate;

    const response = requester({
      data,
      method: signInNormal.properties.method,
      url: `${baseUrl.properties.route}${signInNormal.properties.route}`,
    });

    return response;
  } catch (error) {
    logger._log("signInAPI catch, error:", error);
  }
};

export { signInAPI };
