import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";
import { userUtilities } from "src/classes/UserUtilities";

import { authUtilities } from "src/controllers/auth/utilities";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { store } from "src/store/store";

const verify = () => {
  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { verificationCode },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(verify.name)
      .tryAsync(tryToVerify, verificationCode, dispatch)
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToVerify = async (verificationCode, dispatch) => {
  const token = userUtilities.getToken();

  if (!token) {
    dispatch(commonActions.changeViewMode.signIn());
    authUtilities.printTokenNotFound();
    return;
  }

  return await apiManager.apis.verify.sendFullFeaturedRequest(
    {
      verificationCode,
    },
    { token }
  );
};

const executeIfNoError = (response, dispatch) => {
  dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));

  if (response.data.newUser) {
    dispatch(commonActions.changeViewMode.createUser());
  } else {
    authUtilities.update(response.data, dispatch);
  }
};

export { verify };
