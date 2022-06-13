import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

const verifySignInApi = async ({ token, ...data }) => {
  try {
    const {
      userRouterTemplate: { baseUrl, verifySignInNormal },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, verifySignInNormal),
      token,
    });

    return response;
  } catch (error) {
    logger.log("apiName catch", error);
    throw error;
  }
};

export { verifySignInApi };
