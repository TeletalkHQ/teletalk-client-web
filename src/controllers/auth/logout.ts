import { trier } from "simple-trier";

import { commonActions } from "~/store/commonActions";

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
  dispatch(commonActions.changeViewMode.signIn());
};

export { logout };
