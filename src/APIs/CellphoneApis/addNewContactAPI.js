import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const { cellphoneRouterTemplate } = StuffStore.templates.routerTemplates;
const { baseRoute, addContact } = cellphoneRouterTemplate;

const addNewContactAPI = (data) => {
  const response = requester({
    data,
    method: addContact.properties.method,
    url: `${baseRoute.properties.route}${addContact.properties.route}`,
  });

  return response;
};

export { addNewContactAPI };
