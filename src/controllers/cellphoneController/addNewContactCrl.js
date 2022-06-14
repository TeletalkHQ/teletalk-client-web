import { userAction } from "~/actions/userActions/userActions";
import { addContactApi } from "~/apis/cellphoneApis/addContactApi";

import { getInitialState } from "~/variables/constants/initials/initialStates/initialStates";

const addNewContactCrl = (contact) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const result = await addContactApi(contact);

      dispatch(
        userAction({
          contacts: [...getState().user.contacts, result.data.contact],
        })
      );
    } catch (error) {
      logger.log("addNewContactCrl", error);
    }
  };
};

export { addNewContactCrl };
