import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const getCurrentUserData = () => {
  return async (dispatch) => {
    await trier(getCurrentUserData.name)
      .tryAsync(tryToGetUserData, dispatch)
      .executeIfNoError(executeIfNoError, dispatch)
      .catch(catchTryToGetUserData, dispatch)
      .finally(() => dispatch(commonActions.closeGlobalLoading()))
      .runAsync();
  };
};

const tryToGetUserData = async (dispatch) => {
  dispatch(commonActions.openGlobalLoading());
  const response = (
    await apiManager.apis.getCurrentUserData.sendRequest()
  ).getResponse();

  if (response.statusText !== "OK") throw response.data;

  return response.data;
};
const executeIfNoError = (data, dispatch) => {
  dispatch(actions.updateAllUserData(data.user));
  dispatch(commonActions.changeViewMode.messenger());
};

const catchTryToGetUserData = (_error, dispatch) =>
  dispatch(commonActions.changeViewMode.signIn());

export { getCurrentUserData };
