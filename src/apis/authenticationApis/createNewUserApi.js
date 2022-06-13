import { getApiUrlAndMethod } from "~/functions/utils/utils";
import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";

const createNewUserApi = async ({ token, ...data }) => {
  try {
    const {
      userRouterTemplate: { createNewUser, baseUrl },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      data,
      ...getApiUrlAndMethod(baseUrl, createNewUser),
      token,
    });

    return response;
  } catch (error) {
    logger.log("createNewUserApi catch", error);
    throw error;
  }
};
export { createNewUserApi };
