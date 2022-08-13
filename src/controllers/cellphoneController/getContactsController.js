import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

const getContactsController = () => {
  return async (dispatch) => {
    try {
      const result =
        await apiManager.apis.cellphoneApis.getContactsApi.sendRequest();

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
