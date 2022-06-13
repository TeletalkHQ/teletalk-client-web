import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const logoutApi = async (data) => {
  try {
    const {
      userRouterTemplate: { logoutNormal, baseUrl },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, logoutNormal),
    });

    return response;
  } catch (error) {
    logger.log("logoutApi catch", error);
    throw error;
  }
};
export { logoutApi };
