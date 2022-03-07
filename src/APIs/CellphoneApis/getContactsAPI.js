import { requester } from "~/Functions/Utils/requester";

import { cellphoneRouteTemplate } from "~/Templates/routeTemplates/cellphoneRouteTemplate";

const { baseRoute, getContacts } = cellphoneRouteTemplate;

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
