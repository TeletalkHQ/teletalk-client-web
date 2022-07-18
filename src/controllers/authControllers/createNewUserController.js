import { viewModeAction } from "actions/globalActions";
import { loadingAction } from "actions/userActions";

import { createNewUserApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import {
  INITIAL_VIEW_MODE,
  PERSISTENT_STORAGE_KEYS,
} from "variables/initials/initialValues/initialValues";
import { errors } from "variables/others/errors";

const createNewUserController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { firstName, lastName },
      globalState: { loadingState },
    } = getState();

    try {
      const verifyToken = persistentStorage.getItem(
        PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN
      );

      if (!verifyToken) {
        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw errors.VERIFY_TOKEN_NOT_FOUND;
      }

      const response = await createNewUserApi.sendRequest({
        firstName,
        lastName,
        token: verifyToken,
      });

      console.log(response.data);

      persistentStorage.removeItem(PERSISTENT_STORAGE_KEYS.VERIFY_TOKEN);

      dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));

      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: true } })
      );
    } catch (error) {
      console.log("createNewUserController catch, error:", error);
      dispatch({});
    } finally {
      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: false } })
      );
    }
  };
};

export { createNewUserController };
