import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getCountriesAPI = async (data = {}) => {
  try {
    const { userRouterTemplate } = StuffStore.templates.routerTemplates;
    const { countries, baseRoute } = userRouterTemplate;

    const response = await requester({
      data,
      method: countries.properties.method,
      url: `${baseRoute.properties.route}${countries.properties.route}`,
    });
    return response;
  } catch (error) {
    console.log("getCountriesAPI catch", error);

    throw error;
  }
};
export { getCountriesAPI };
