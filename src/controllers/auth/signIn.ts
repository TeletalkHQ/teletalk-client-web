import { trier } from "simple-trier";

import { commonActions } from "~/store/commonActions";
import { store } from "~/store/store";

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

const executeIfNoError = (_, dispatch) => {
  dispatch(commonActions.changeViewMode.verify());
};

export { signIn };
