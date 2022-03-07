import { userAction } from "~/Actions/UserActions/userActions";
import { addNewContactAPI } from "~/APIs/CellphoneApis/addNewContactAPI";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const addNewContactCRL = (contact) => {
  return async (dispatch, getState = initialState) => {
    try {
      const result = await addNewContactAPI(contact);

      dispatch(
        userAction({
          contacts: [...getState().user.contacts, result.data.contact],
        })
      );
    } catch (error) {
      console.log("addNewContactCRL", error);
    }
  };
};

export { addNewContactCRL };
