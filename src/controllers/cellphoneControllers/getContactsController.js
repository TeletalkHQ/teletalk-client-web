import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getContactsController = () => {
  return async (dispatch) => {
    try {
      const result =
        await apiManager.apis.cellphoneApis.getContactsApi.sendFullFeaturedRequest();

      dispatch(
        userActions.updateAllUserContactsAction({
          contacts: result.data.contacts,
        })
      );
    } catch (error) {
      printCatchError(getContactsController.name, error);
    }
  };
};

export { getContactsController };
