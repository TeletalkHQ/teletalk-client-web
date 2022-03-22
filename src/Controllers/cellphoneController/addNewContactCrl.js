import { userAction } from "~/Actions/UserActions/userActions";
import { addNewContactApi } from "~/Apis/CellphoneApis/addNewContactApi";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

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
