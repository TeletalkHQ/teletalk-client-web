import { trier } from "simple-trier";

import { apiManager } from "src/classes/api/ApiManager";

import { authUtilities } from "src/controllers/auth/utilities";

import { commonActions } from "src/store/commonActions";
import { store } from "src/store/store";

const createNewUser = () => {
  return async (dispatch, getState = store.initialStates) => {
    const {
      auth: { firstName, lastName },
    } = getState();

    dispatch(commonActions.changeAuthenticationProgress(true));

    await trier(createNewUser.name)
      .tryAsync(tryToCreate, { firstName, lastName, dispatch })
      .executeIfNoError(authUtilities.update, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToCreate = async ({ firstName, lastName }) => {
  const { data } = await apiManager.apis.createNewUser.sendFullFeaturedRequest({
    firstName,
    lastName,
  });

  return data;
};

export { createNewUser };
