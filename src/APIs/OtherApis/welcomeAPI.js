import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { otherRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, welcome } = otherRouterTemplate;

const welcomeAPI = async () => {
  try {
    const response = await requester({
      method: welcome.properties.method,
      url: `${baseRoute.properties.route}${welcome.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("welcomeAPI catch", error);
    throw error;
  }
};

export { welcomeAPI };
