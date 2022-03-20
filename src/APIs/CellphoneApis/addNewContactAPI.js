import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";

const addNewContactAPI = async (data) => {
  try {
    const { cellphoneRouterTemplate } = StuffStore.templates.routerTemplates;
    const { baseRoute, addContact } = cellphoneRouterTemplate;

    const response = requester({
      data,
      method: addContact.properties.method,
      url: `${baseRoute.properties.route}${addContact.properties.route}`,
    });

    return response;
  } catch (error) {
    console.log("addNewContactAPI catch", error);
  }
};
export { addNewContactAPI };
