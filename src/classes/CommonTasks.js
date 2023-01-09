import { stringUtilities } from "utility-store/src/classes/StringUtilities";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { commonNotificationManager } from "src/classes/CommonNotificationManager";
import { notificationManager } from "src/classes/NotificationManager";
import { persistentStorage } from "src/classes/PersistentStorage";
import { stuffStore } from "src/classes/StuffStore";

import { utilities } from "src/utilities";

import { extractedDispatch } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

import { variables } from "src/variables";

class CommonTasks {
  resetEverything() {
    persistentStorage.setDefaultStorage();

    [
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

  checkConnAbortNotification(error) {
    const isConnectionInterrupted =
      !windowUtilities.isOnline() ||
      utilities.checkErrorCodeIsConnAborted(error?.code);

    this.checkAndExecute(isConnectionInterrupted, () => {
      commonNotificationManager.submitAbortedConnectionNotification(error);
    });
  }

  convertServerFormatErrors(errors) {
    const arrayOfErrors = Object.values(errors);

    return arrayOfErrors.map((errorItem) => {
      const { errorCode, reason, ...finalErrorItem } = errorItem;

      finalErrorItem.notificationCode = errorCode;
      finalErrorItem.notificationReason = reason;

      return finalErrorItem;
    });
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
        // eslint-disable-next-line no-throw-literal
        throw {
          ...variables.notification.error.REQUIREMENT_ITEM_MISSING,
          allItems: items,
        };
      }
    });
  }
}

const commonTasks = new CommonTasks();

export { commonTasks, CommonTasks };
