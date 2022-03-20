import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const userStatusCheckerAPI = async (data) => {
  try {
    const { userRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseRoute, statusCheck } = userRouterTemplate;

    const response = requester({
      method: statusCheck.properties.method,
      url: `${baseRoute.properties.route}${statusCheck.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("apiName catch", error);
  }
};

export { userStatusCheckerAPI };
