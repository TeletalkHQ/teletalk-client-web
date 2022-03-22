import { getApiUrlAndMethod } from "~/Functions/Utils/utils";
import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

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
    console.log("createNewUserApi catch", error);
    throw error;
  }
};
export { createNewUserApi };
