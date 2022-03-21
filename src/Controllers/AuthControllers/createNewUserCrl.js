import { viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { loadingAction } from "~/Actions/UserActions/userActions";
import { createNewUserApi } from "~/Apis/AuthenticationApis/createNewUserApi";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";
import { getInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";

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
      console.log("createNewUserCrl", error);
    } finally {
      dispatch(loadingAction({ loading: false }));
    }
  };
};

export { createNewUserCrl };
