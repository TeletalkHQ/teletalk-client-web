import { userActions } from "actions/userActions";

import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";

import { viewModeChange } from "functions/utilities/commonActions";

import { extractedDispatch } from "hooks/useThunkReducer";

import { VIEW_MODES } from "variables/others/staticValues";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    extractedDispatch(
      userActions.userAction(userPropsUtilities.makeDefaultUserState())
    );
    extractedDispatch(viewModeChange(VIEW_MODES.SIGN_IN));
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
