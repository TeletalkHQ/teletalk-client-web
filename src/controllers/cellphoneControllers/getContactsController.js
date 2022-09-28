import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getContactsController = () => {
  return async (dispatch) => {
    try {
      const result =
        await apiManager.apis.getContacts.sendFullFeaturedRequest();

      dispatch(
        actions.updateAllUserContacts({
          contacts: result.data.contacts,
        })
      );
    } catch (error) {
      printCatchError(getContactsController.name, error);
    }
  };
};

export { getContactsController };
