import { userAction } from "~/Actions/UserActions/userActions";
import { getContactsAPI } from "~/APIs/CellphoneApis/getContactsAPI";

const getContactsCRL = () => {
  return async (dispatch, getState) => {
    try {
      const result = await getContactsAPI();

      dispatch(userAction({ contacts: result.data.contacts }));
    } catch (error) {}
  };
};

export { getContactsCRL };
