import { userActions } from "actions/userActions";
import { globalActions } from "actions/globalActions";

import { persistentStorage } from "classes/PersistentStorage";

import { appDispatch } from "functions/injectors/dispatchInjector";
import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    appDispatch(userActions.userAction(userInitializer()));
    appDispatch(
      globalActions.viewModeAction({
        viewMode: INITIAL_VIEW_MODE.SIGN_IN,
      })
    );
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
