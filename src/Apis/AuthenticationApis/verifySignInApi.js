import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
