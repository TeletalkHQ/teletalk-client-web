import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { commonNotificationManager } from "classes/CommonNotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";
import { windowUtilities } from "classes/WindowUtilities";

import { viewModeChange } from "functions/utilities/commonActions";
import { checkErrorCodeIsConnAborted } from "functions/utilities/otherUtilities";

import { extractedDispatch } from "hooks/useThunkReducer";

import { VIEW_MODES } from "variables/others/constants";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    extractedDispatch(
      userActions.updateAllUserDataAction(
        userPropsUtilities.makeDefaultUserState()
      )
    );
    extractedDispatch(viewModeChange(VIEW_MODES.SIGN_IN));
  }

  resetMessageInputText() {
    extractedDispatch(
      tempActions.messageInputOnChangeAction({ messageInputText: "" })
    );
  }

  printCatchError(functionName, error) {
    logger.error(`${functionName} catch, error: ${error}`);
  }

  checkAndExecute(condition, callback) {
    if (condition) return callback();
  }

  throwConnAbortNotification(error) {
    const isConnectionInterrupted =
      !windowUtilities.isOnline() || checkErrorCodeIsConnAborted(error?.code);

    this.checkAndExecute(isConnectionInterrupted, () => {
      commonNotificationManager.submitAbortedConnectionNotification(error);
    });
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
