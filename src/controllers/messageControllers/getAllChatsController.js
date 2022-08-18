import { userActions } from "actions/userActions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getAllChatsController = () => {
  return async (dispatch) => {
    try {
      const response =
        await apiManager.apis.messageApis.getAllChatsApi.sendRequest();

      dispatch(
        userActions.updateAllUserDataAction({ chats: response.data.chats })
      );
    } catch (error) {
      printCatchError(getAllChatsController.name, error);
    }
  };
};

export { getAllChatsController };
