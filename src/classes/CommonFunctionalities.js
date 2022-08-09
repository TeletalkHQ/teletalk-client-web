import { userActions } from "actions/userActions";

import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { appDispatch } from "functions/injectors/dispatchInjector";
import { viewModeChange } from "functions/utilities/commonActions";

import { VIEW_MODES } from "variables/others/staticValues";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    appDispatch(
      userActions.userAction(userPropsUtilities.makeDefaultUserState())
    );
    appDispatch(viewModeChange(VIEW_MODES.SIGN_IN));
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
