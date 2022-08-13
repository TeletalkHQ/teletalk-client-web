import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

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
      console.log("addNewContactController", error);
    }
  };
};

export { addNewContactController };
