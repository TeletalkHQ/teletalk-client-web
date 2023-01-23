import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";

const getAllPrivateChats = () => {
  return async (dispatch) => {
    await trier(getAllPrivateChats.name)
      .tryAsync(tryToGetAllPrivateChats)
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();
  };
};

const tryToGetAllPrivateChats = async () => {
  const response =
    await apiManager.apis.getAllPrivateChats.sendFullFeaturedRequest();

  return response.data;
};

const executeIfNoError = (data, dispatch) => {
  dispatch(
    actions.updateAllPrivateChats({
      privateChats: data.privateChats,
    })
  );
};

export { getAllPrivateChats };
