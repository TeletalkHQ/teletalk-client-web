import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const getCurrentUserData = () => {
  return async (dispatch) => {
    await trier(getCurrentUserData.name)
      .tryAsync(tryBlock, dispatch)
      .executeIfNoError(executeIfNoError, dispatch)
      .catch(catchBlock, dispatch)
      .finally(() => dispatch(commonActions.closeGlobalLoading()))
      .runAsync();
  };
};

const tryBlock = async (dispatch) => {
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

const catchBlock = (_error, dispatch) =>
  dispatch(commonActions.changeViewMode.signIn());

export { getCurrentUserData };
