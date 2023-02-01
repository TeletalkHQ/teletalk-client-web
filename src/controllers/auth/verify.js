import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";

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
      .tryAsync(tryBlock, {
        verificationCode,
      })
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryBlock = async ({ verificationCode }) => {
  return await apiManager.apis.verify.sendFullFeaturedRequest({
    verificationCode,
  });
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
