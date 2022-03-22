import { getApiUrlAndMethod } from "~/Functions/Utils/utils";
import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getCountriesApi = async (data = {}) => {
  try {
    const {
      userRouterTemplate: { countries, baseUrl },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, countries),
    });

    return response;
  } catch (error) {
    logger.log("getCountriesApi catch", error);
    throw error;
  }
};
export { getCountriesApi };
