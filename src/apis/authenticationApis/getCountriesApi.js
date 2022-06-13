import { getApiUrlAndMethod } from "~/functions/utils/utils";
import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";

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
