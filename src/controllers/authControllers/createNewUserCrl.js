import { viewModeAction } from "~/actions/globalActions/globalActions";
import { loadingAction } from "~/actions/userActions/userActions";
import { createNewUserApi } from "~/apis/authenticationApis/createNewUserApi";
import { PersistentStorage } from "~/functions/utils/PersistentStorage";
import { getInitialState } from "~/variables/constants/initials/initialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/variables/constants/initials/initialValues/initialValues";

const createNewUserCrl = () => {
  return async (dispatch, getState = getInitialState) => {
    try {
      const verifyToken = PersistentStorage.getItem({ key: "verifyToken" });

      if (!verifyToken) {
        const error = "verifyToken is not defined";

        dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));

        throw error;
      }

      const {
        tempState: { firstName, lastName },
      } = getState();

      const response = await createNewUserApi({
        firstName,
        lastName,
        token: verifyToken,
      });

      PersistentStorage.removeItem({ key: "verifyToken" });

      dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.MESSENGER }));

      dispatch(loadingAction({ loading: true }));
    } catch (error) {
      logger.log("createNewUserCrl", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { createNewUserCrl };
