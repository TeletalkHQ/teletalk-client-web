import { requester } from "~/Functions/Utils/requester";

import { otherRouteTemplate } from "~/Templates/routeTemplates/otherRouteTemplate";

const { baseRoute, welcome } = otherRouteTemplate;

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
