import { userAction } from "~/Actions/UserActions/userActions";
import { addNewContactAPI } from "~/APIs/CellphoneApis/addNewContactAPI";

import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const addNewContactCrl = (contact) => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const result = await addNewContactAPI(contact);

      dispatch(
        userAction({
          contacts: [...getState().user.contacts, result.data.contact],
        })
      );
    } catch (error) {
      console.log("addNewContactCrl", error);
    }
  };
};

export { addNewContactCrl };
