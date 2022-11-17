import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";
import { stringUtilities } from "utility-store/src/classes/StringUtilities";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { actions } from "actions/actions";

import { commonNotificationManager } from "classes/CommonNotificationManager";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { stuffStore } from "classes/StuffStore";

import { checkErrorCodeIsConnAborted } from "functions/utilities/otherUtilities";

import { extractedDispatch } from "hooks/useThunkReducer";

import { VIEW_MODES } from "variables/otherVariables/helpers";

class CommonJobsHandler {
  resetEverything() {
    persistentStorage.setDefaultStorage();

    [
      actions.resetUserState,
      actions.resetGlobalState,
      actions.resetTempState,
    ].forEach((action) => {
      extractedDispatch(action());
    });

    this.changeViewMode().signIn();
  }

  resetMessageInputText() {
    extractedDispatch(
      actions.messageInputOnChange({ messageInputTextValue: "" })
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
      extractedDispatch(actions.viewModeChange({ viewMode }));

    return {
      messenger: viewModeChanger(MESSENGER),
      createNewUser: viewModeChanger(NEW_USER_PROFILE),
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

  validateInputValueLengthByModelMinMaxLength(model, inputValue) {
    const {
      maxlength: { value: maxlengthValue },
      minlength: { value: minlengthValue },
    } = model;

    const inputValueLength = stringUtilities.valueLength(inputValue);

    return (
      inputValueLength >= minlengthValue && inputValueLength <= maxlengthValue
    );
  }

  validateInputValueLengthByModelLength(model, inputValue) {
    const inputValueLength = stringUtilities.valueLength(inputValue);
    return inputValueLength === model.length.value;
  }
}

const commonJobsHandler = new CommonJobsHandler();

export { commonJobsHandler, CommonJobsHandler };