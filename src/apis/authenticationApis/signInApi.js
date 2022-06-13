import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const signInApi = async (data) => {
  try {
    const {
      userRouterTemplate: { baseUrl, signInNormal },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, signInNormal),
    });

    return response;
  } catch (error) {
    logger.log("signInApi catch, error:", error);
    throw error;
  }
};

export { signInApi };
