import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const getContactsAPI = (data) => {
  try {
    const { cellphoneRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseRoute, getContacts } = cellphoneRouterTemplate;

    const response = requester({
      data,
      method: getContacts.properties.method,
      url: `${baseRoute.properties.route}${getContacts.properties.route}`,
    });

    return response;
  } catch (error) {
    logger._log("getContactsApi catch, error:", error);
  }
};

export { getContactsAPI };
