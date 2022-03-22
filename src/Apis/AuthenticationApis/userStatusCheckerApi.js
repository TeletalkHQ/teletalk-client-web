import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
    console.log("apiName catch", error);
    throw error;
  }
};

export { userStatusCheckerApi };
