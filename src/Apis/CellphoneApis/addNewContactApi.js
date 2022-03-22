import { requester } from "~/Functions/Utils/requester";
import { StuffStore } from "~/Functions/Utils/StuffStore";
import { getApiUrlAndMethod } from "~/Functions/Utils/utils";

const addNewContactApi = async (data) => {
  try {
    const {
      cellphoneRouterTemplate: { baseUrl, addContact },
    } = StuffStore.templates.routerTemplates;

    const response = requester({
      data,
      ...getApiUrlAndMethod(baseUrl, addContact),
    });

    return response;
  } catch (error) {
    logger.log("addNewContactApi catch", error);
    throw error;
  }
};

export { addNewContactApi };
