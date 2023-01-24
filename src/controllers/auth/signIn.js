import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

import { commonActions } from "src/store/commonActions";
import { store } from "src/store/store";
import { actions } from "src/store/actions";

const signIn = () => {
  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { phoneNumber, countryCode, countryName },
    } = getState();
    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(signIn.name)
      .tryAsync(tryToSignIn, {
        countryCode,
        countryName,
        phoneNumber,
      })
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToSignIn = async ({ countryCode, countryName, phoneNumber }) => {
  return await apiManager.apis.signIn.sendFullFeaturedRequest({
    countryCode,
    countryName,
    phoneNumber,
  });
};

const executeIfNoError = (response, dispatch) => {
  const { token } = response.data;

  dispatch(actions.updateVerifyToken({ verifyToken: token }));
  dispatch(commonActions.changeViewMode.verify());
};

export { signIn };
