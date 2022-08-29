import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";

import { globalActions } from "actions/globalActions";
import { otherActions } from "actions/otherActions";
import { tempActions } from "actions/tempActions";
import { userActions } from "actions/userActions";

import { commonNotificationManager } from "classes/CommonNotificationManager";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { windowUtilities } from "classes/WindowUtilities";

import { checkErrorCodeIsConnAborted } from "functions/utilities/otherUtilities";

import { extractedDispatch } from "hooks/useThunkReducer";

import { VIEW_MODES } from "variables/otherVariables/constants";
import { stuffStore } from "./StuffStore";

class CommonFunctionalities {
  resetEverything() {
    persistentStorage.setDefaultStorage();

    [
      userActions.resetUserState,
      otherActions.resetOtherState,
      globalActions.resetGlobalState,
      tempActions.resetTempState,
    ].forEach((action) => {
      extractedDispatch(action());
    });

    this.changeViewMode().signIn();
  }

  resetMessageInputText() {
    extractedDispatch(
      tempActions.messageInputOnChangeAction({ messageInputText: "" })
    );
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

  correctServerLikeErrors(errors) {
    const arrayOfErrors = objectUtilities.objectValues(errors);

    const correctedErrors = arrayOfErrors.map((errorItem) => {
      const { errorCode, reason, ...finalErrorItem } = errorItem;

      finalErrorItem.notificationCode = errorCode;
      finalErrorItem.notificationReason = reason;

      return finalErrorItem;
    });

    return correctedErrors;
  }

  errorsPrinter(errors) {
    errors.forEach((errorItem) => {
      const { errorMessages } = stuffStore.languageData;
      const errorUniqueId = errorItem.notificationReason;
      const message = errorMessages[errorUniqueId];

      const notificationObject = { ...errorItem, message };
      notificationManager.submitErrorNotification(notificationObject);
    });
  }

  correctErrorsAndPrint(errors) {
    const correctedErrors = this.correctServerLikeErrors(errors);
    this.errorsPrinter(correctedErrors);
  }
}

const commonFunctionalities = new CommonFunctionalities();

export { commonFunctionalities, CommonFunctionalities };
