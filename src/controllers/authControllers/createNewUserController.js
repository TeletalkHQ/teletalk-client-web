import { globalActions } from "actions/globalActions";
import { userActions } from "actions/userActions";

import { createNewUserApi } from "apis/authenticationApis";

import { notificationManager } from "classes/NotificationManager";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { getInitialState } from "variables/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";
import { notifications } from "variables/others/notifications";

const { viewModeChangeAction } = globalActions;
const { loadingAction } = userActions;

const createNewUserController = () => {
  return async (dispatch, getState = getInitialState) => {
    const {
      tempState: { firstName, lastName },
      globalState: { loadingState },
    } = getState();

    try {
      const verifyToken = userPropsUtilities.getVerifyTokenFromStorage();

      if (!verifyToken) {
        dispatch(viewModeChangeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        notificationManager.submitErrorNotification(
          notifications.localErrors.VERIFY_TOKEN_NOT_FOUND
        );
      }

      const response = await createNewUserApi.sendRequest(
        {
          firstName,
          lastName,
        },
        { token: verifyToken }
      );

      console.log(response.data);

      userPropsUtilities.removeVerifyTokenFromStorage();

      dispatch(viewModeChangeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));

      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: true } })
      );
    } catch (error) {
      console.log("createNewUserController catch, error:", error);
    } finally {
      dispatch(
        loadingAction({ loadingState: { ...loadingState, loading: false } })
      );
    }
  };
};

export { createNewUserController };
