import { objectUtilities } from "utility-store/src/classes/ObjectUtilities";
import { stringUtilities } from "utility-store/src/classes/StringUtilities";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { commonNotificationManager } from "classes/CommonNotificationManager";
import { notificationManager } from "classes/NotificationManager";
import { persistentStorage } from "classes/PersistentStorage";
import { stuffStore } from "classes/StuffStore";

import { utilities } from "utilities";

import { extractedDispatch } from "hooks/useThunkReducer";

import { actions } from "store/actions";

import { variables } from "variables";

class CommonTasks {
  resetEverything() {
    persistentStorage.setDefaultStorage();

    [
      //TODO: Move to Provider
      //TODO: Add otherState too
      actions.resetUserState,
      actions.resetGlobalState,
      actions.resetAuthState,
    ].forEach((action) => {
      extractedDispatch(action());
    });
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
      !windowUtilities.isOnline() ||
      utilities.checkErrorCodeIsConnAborted(error?.code);

    this.checkAndExecute(isConnectionInterrupted, () => {
      commonNotificationManager.submitAbortedConnectionNotification(error);
    });
  }

  convertServerFormatErrors(errors) {
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
    const correctedErrors = this.convertServerFormatErrors(errors);
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

  checkRequirements(...items) {
    items.forEach((item) => {
      if (!item) {
        const error = {
          ...variables.notification.error.REQUIREMENT_ITEM_MISSING,
          allItems: items,
        };
        throw error;
      }
    });
  }
}

const commonTasks = new CommonTasks();

export { commonTasks, CommonTasks };
