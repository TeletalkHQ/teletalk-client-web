import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { cellphoneRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, getContacts } = cellphoneRouterTemplate;

const getContactsAPI = (data) => {
  try {
    const response = requester({
      data,
      method: getContacts.properties.method,
      url: `${baseRoute.properties.route}${getContacts.properties.route}`,
    });

    return response;
  } catch (error) {}
};

export { getContactsAPI };
