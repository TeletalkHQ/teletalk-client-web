import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getContactsApi = (data) => {
  try {
    const { cellphoneRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseUrl, getContacts } = cellphoneRouterTemplate;

    const response = requester({
      data,
      method: getContacts.properties.method,
      url: `${baseUrl.properties.route}${getContacts.properties.route}`,
    });

    return response;
  } catch (error) {
    logger._log("getContactsApi catch, error:", error);
  }
};

export { getContactsApi };
