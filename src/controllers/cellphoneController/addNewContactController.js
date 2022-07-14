import { userAction } from "actions/userActions";

import { addContactApi } from "apis/cellphoneApis";

import { getInitialState } from "variables/initials/initialStates/initialStates";

const addNewContactController = (contact) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const result = await addContactApi.sendRequest(contact);

      dispatch(
        userAction({
          contacts: [...getState().user.contacts, result.data.contact],
        })
      );
    } catch (error) {
      console.log("addNewContactController", error);
    }
  };
};

export { addNewContactController };
