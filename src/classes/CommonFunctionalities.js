import { userActions } from "actions/userActions";
import { globalActions } from "actions/globalActions";

import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { appDispatch } from "functions/injectors/dispatchInjector";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    appDispatch(
      userActions.userAction(userPropsUtilities.makeDefaultUserState())
    );
    appDispatch(
      globalActions.viewModeChangeAction({
        viewMode: INITIAL_VIEW_MODE.SIGN_IN,
      })
    );
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
