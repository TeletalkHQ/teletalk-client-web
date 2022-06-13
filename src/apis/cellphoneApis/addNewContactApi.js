import { requester } from "~/functions/utils/requester";
import { StuffStore } from "~/functions/utils/StuffStore";
import { getApiUrlAndMethod } from "~/functions/utils/utils";

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
