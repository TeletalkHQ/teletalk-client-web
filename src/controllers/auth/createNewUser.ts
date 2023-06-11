import { trier } from "simple-trier";

import { commonActions } from "~/store/commonActions";
import { store } from "~/store/store";

const createNewUser = () => {
  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { firstName, lastName },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(createNewUser.name)
      .tryAsync(tryToBlock, { firstName, lastName, dispatch })
      .executeIfNoError(executeIfNoError, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToBlock = async ({ firstName, lastName }) => {
  const { data } = await apiManager.apis.createNewUser.sendFullFeaturedRequest({
    firstName,
    lastName,
  });

  return data;
};

const executeIfNoError = (_data, dispatch) =>
  dispatch(commonActions.changeViewMode.checkCurrentUser());

export { createNewUser };
