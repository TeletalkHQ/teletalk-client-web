import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
