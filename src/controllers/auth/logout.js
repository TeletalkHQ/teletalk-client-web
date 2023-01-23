import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";
import { commonTasks } from "src/classes/CommonTasks";

import { commonActions } from "src/store/commonActions";

const logout = () => {
  return async (dispatch) => {
    await trier(logout.name)
      .tryAsync(tryToLogout)
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();
  };
};

const tryToLogout = async () =>
  await apiManager.apis.logout.sendFullFeaturedRequest();

const executeIfNoError = (_, dispatch) => {
  commonTasks.resetEverything();
  dispatch(commonActions.changeViewMode.signIn());
};

export { logout };
