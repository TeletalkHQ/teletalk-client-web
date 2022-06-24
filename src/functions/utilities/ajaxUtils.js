import { viewModeAction } from "actions/globalActions";
import { userAction } from "actions/userActions";

import { PersistentStorage } from "classes/PersistentStorage";

import { appDispatch } from "functions/others/injectors/dispatchInjector";
import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const responseHandler = (response) => {
  try {
    const rejection = () => {
      throw response;
    };

    const statusCode = response.statusCode || response.status;

    if (statusCode >= 400 && statusCode < 500) {
      switch (statusCode) {
        case 400:
          appDispatch({ type: "request result", payload: "BAD REQUEST!" });
          rejection();
          break;

        case 401:
          PersistentStorage.clear();
          appDispatch(userAction({ ...userInitializer() }));
          appDispatch(
            viewModeAction({
              viewMode: INITIAL_VIEW_MODE.SIGN_IN,
            })
          );
          rejection();
          break;

        case 805:
          appDispatch();
          rejection();
          break;

        case 804:
          appDispatch();
          rejection();
          break;

        case 823:
          appDispatch();
          rejection();
          break;

        case 826:
          appDispatch();
          rejection();
          break;

        default:
          appDispatch();
          rejection();
          break;
      }
    } else if (statusCode >= 500 && statusCode < 600) {
      switch (statusCode) {
        case 500:
          appDispatch({ type: "reject", payload: response });
          rejection();
          break;

        default:
          appDispatch();
          rejection();
          break;
      }
    } else if (statusCode >= 600) {
      //...
      rejection();
    }

    return response;
  } catch (error) {
    console.log("responseHandler catch", error);
    throw error;
  }
};

export { responseHandler };
