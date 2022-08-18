import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const addNewContactController = (contact) => {
  return async (dispatch) => {
    try {
      const result =
        await apiManager.apis.cellphoneApis.addContactApi.sendRequest(contact);

      dispatch(
        userActions.addNewContactAction({
          newContact: result.data.addedContact,
        })
      );
    } catch (error) {
      printCatchError(addNewContactController.name, error);
    }
  };
};

export { addNewContactController };
