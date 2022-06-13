import { userAction } from "~/actions/userActions/userActions";
import { addNewContactApi } from "~/apis/cellphoneApis/addNewContactApi";

import { getInitialState } from "~/variables/constants/initials/initialStates/initialStates";

const addNewContactCrl = (contact) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const result = await addNewContactApi(contact);

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
