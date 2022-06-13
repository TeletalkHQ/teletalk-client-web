import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const welcomeApi = async () => {
  try {
    const {
      otherRouterTemplate: { baseUrl, welcome },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      ...getApiUrlAndMethod(baseUrl, welcome),
    });

    return response;
  } catch (error) {
    logger.log("welcomeApi catch", error);
    throw error;
  }
};

export { welcomeApi };
