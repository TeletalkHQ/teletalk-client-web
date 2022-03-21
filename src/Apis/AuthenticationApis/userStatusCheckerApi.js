import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const userStatusCheckerApi = async (data) => {
  try {
    const { userRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseUrl, statusCheck } = userRouterTemplate;

    const response = requester({
      method: statusCheck.properties.method,
      url: `${baseUrl.properties.route}${statusCheck.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("apiName catch", error);
  }
};

export { userStatusCheckerApi };
