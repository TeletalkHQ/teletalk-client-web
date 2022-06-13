import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const userStatusCheckerApi = async (data) => {
  try {
    const {
      userRouterTemplate: { baseUrl, statusCheck },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, statusCheck),
    });

    return response;
  } catch (error) {
    logger.log("apiName catch", error);
    throw error;
  }
};

export { userStatusCheckerApi };
