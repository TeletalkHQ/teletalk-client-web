import { trier } from "simple-trier";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { store } from "~/store/store";

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
    dispatch(commonActions.changeViewMode.checkCurrentUser());
  }
};

export { verify };
