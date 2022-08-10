import { userActions } from "actions/userActions";

import { getContactsApi } from "apis/cellphoneApis";

const getContactsController = () => {
  return async (dispatch) => {
    try {
      const result = await getContactsApi.sendRequest();

      dispatch(
        userActions.updateAllUserContactsAction({
          contacts: result.data.contacts,
        })
      );
    } catch (error) {
      console.log("getContactsController catch, error:", error);
    }
  };
};

export { getContactsController };
