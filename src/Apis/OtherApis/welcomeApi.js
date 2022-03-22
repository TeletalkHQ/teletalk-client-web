import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

const welcomeApi = async () => {
  try {
    const {
      otherRouterTemplate: { baseUrl, welcome },
    } = StuffStore.templates.routerTemplates;

    const response = await requester({
      ...getApiUrlAndMethod(baseUrl, welcome),
    });

    return response;
  } catch (error) {
    console.log("welcomeApi catch", error);
    throw error;
  }
};

export { welcomeApi };
