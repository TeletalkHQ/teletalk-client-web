import { globalActions } from "actions/globalActions";
import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { commonNotificationManager } from "classes/CommonNotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { userPropsUtilities } from "classes/UserPropsUtilities";
import { windowUtilities } from "classes/WindowUtilities";

import { checkErrorCodeIsConnAborted } from "functions/utilities/otherUtilities";

import { extractedDispatch } from "hooks/useThunkReducer";

import { VIEW_MODES } from "variables/otherVariables/constants";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();
    extractedDispatch(
      userActions.updateAllUserDataAction(
        userPropsUtilities.makeDefaultUserState()
      )
    );
    this.changeViewMode().signIn();
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

  changeViewMode() {
    const { MESSENGER, NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN } = VIEW_MODES;
    const viewModeChanger = (viewMode) => () =>
      extractedDispatch(globalActions.viewModeChangeAction({ viewMode }));

    return {
      messenger: viewModeChanger(MESSENGER),
      newUserProfile: viewModeChanger(NEW_USER_PROFILE),
      signIn: viewModeChanger(SIGN_IN),
      verifySignIn: viewModeChanger(VERIFY_SIGN_IN),
    };
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
