import { userAction } from "actions/userActions";
import { viewModeAction } from "actions/globalActions";

import { persistentStorage } from "classes/PersistentStorage";

import { appDispatch } from "functions/others/injectors/dispatchInjector";
import { userInitializer } from "functions/helpers/userInitializer";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    appDispatch(userAction(userInitializer()));
    appDispatch(
      viewModeAction({
        viewMode: INITIAL_VIEW_MODE.SIGN_IN,
      })
    );
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
