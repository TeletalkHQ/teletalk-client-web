import { userAction } from "~/Actions/UserActions/userActions";
import { getContactsApi } from "~/Apis/CellphoneApis/getContactsApi";

const getContactsCrl = () => {
  return async (dispatch, getState) => {
    try {
      const result = await getContactsApi();

      dispatch(userAction({ contacts: result.data.contacts }));
    } catch (error) {}
  };
};

export { getContactsCrl };
