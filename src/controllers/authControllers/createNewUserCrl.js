import { viewModeAction } from "actions/globalActions";
import { loadingAction } from "actions/userActions";

import { createNewUserApi } from "apis/authenticationApis";

import { persistentStorage } from "classes/PersistentStorage";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const createNewUserCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const verifyToken = persistentStorage.getItem({ key: "verifyToken" });

      if (!verifyToken) {
        const error = "verifyToken is not defined";

        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw error;
      }

      const {
        tempState: { firstName, lastName },
      } = getState();

      const response = await createNewUserApi.sendRequest({
        firstName,
        lastName,
        token: verifyToken,
      });

      console.log(response.data);

      persistentStorage.removeItem({ key: "verifyToken" });

      dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));

      dispatch(loadingAction({ loading: true }));
    } catch (error) {
      console.log("createNewUserCrl", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { createNewUserCrl };
