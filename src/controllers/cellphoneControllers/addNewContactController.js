import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const addNewContactController = (contact) => {
  return async (dispatch) => {
    try {
      const result = await apiManager.apis.addContact.sendFullFeaturedRequest(
        contact
      );

      dispatch(
        actions.addNewContact({
          newContact: result.data.addedContact,
        })
      );
    } catch (error) {
      printCatchError(addNewContactController.name, error);
    }
  };
};

export { addNewContactController };
