import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

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
    console.log("logoutApi catch", error);
    throw error;
  }
};
export { logoutApi };
