import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

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
