import { userActions } from "actions/userActions";

import { addContactApi } from "apis/cellphoneApis";

const addNewContactController = (contact) => {
  return async (dispatch) => {
    try {
      const result = await addContactApi.sendRequest(contact);

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
