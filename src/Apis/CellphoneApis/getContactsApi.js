import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

const getContactsApi = (data) => {
  try {
    const {
      cellphoneRouterTemplate: { baseUrl, getContacts },
    } = StuffStore.templates.routerTemplates;

    const response = requester({
      data,
      ...getApiUrlAndMethod(baseUrl, getContacts),
    });

    return response;
  } catch (error) {
    logger.log("getContactsApi catch, error:", error);
    throw error;
  }
};

export { getContactsApi };
