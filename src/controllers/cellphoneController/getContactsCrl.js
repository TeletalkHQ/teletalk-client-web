import { userAction } from "actions/userActions/userActions";
import { getContactsApi } from "apis/cellphoneApis";

const getContactsCrl = () => {
  return async (dispatch, getState) => {
    try {
      const result = await getContactsApi();

      dispatch(userAction({ contacts: result.data.contacts }));
    } catch (error) {}
  };
};

export { getContactsCrl };
