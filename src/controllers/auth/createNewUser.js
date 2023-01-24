import { trier } from "utility-store/src/classes/Trier";

import { apiManager } from "src/classes/api/ApiManager";
import { commonTasks } from "src/classes/CommonTasks";
import { userUtilities } from "src/classes/UserUtilities";

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
      .tryAsync(tryToCreate, firstName, lastName, dispatch)
      .executeIfNoError(authUtilities.update, dispatch)
      .runAsync();

    dispatch(commonActions.changeAuthenticationProgress(false));
  };
};

const tryToCreate = async (firstName, lastName, dispatch) => {
  const token = userUtilities.getToken();
  commonTasks.checkAndExecute(!token, () => {
    dispatch(commonActions.changeViewMode.signIn());
    authUtilities.printTokenNotFound();
  });

  const { data } = await apiManager.apis.createNewUser.sendFullFeaturedRequest(
    {
      firstName,
      lastName,
    },
    { token }
  );

  return data;
};

export { createNewUser };
