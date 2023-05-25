import { windowUtilities } from "~/classes/WindowUtilities";

import { commonNotificationManager } from "~/classes/CommonNotificationManager";
import { notificationManager } from "~/classes/NotificationManager";
import { PersistentStorage } from "~/classes/PersistentStorage";
import { stuffStore } from "~/classes/StuffStore";

import { extractedDispatch } from "~/helpers/extractedDispatch";

import { utilities } from "~/utilities";

import { actions } from "~/store/actions";

import { variables } from "~/variables";

class CommonTasks {
  resetEverything() {
    new PersistentStorage().setDefaultStorage();

    [
      actions.resetAuthState,
      actions.resetGlobalState,
      actions.resetMessageState,
      actions.resetSettingsState,
      actions.resetUserState,
    ].forEach((action) => {
      extractedDispatch(action());
    });
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

  correctErrorsAndPrint(errors) {
    const correctedErrors = this.convertServerFormatErrors(errors);
    this.errorsPrinter(correctedErrors);
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

  validateInputValueLengthByModel(model, inputValue) {
    const {
      maxlength: { value: maxlengthValue },
      minlength: { value: minlengthValue },
    } = model;

    const inputValueLength = inputValue.length;

    return (
      inputValueLength >= minlengthValue && inputValueLength <= maxlengthValue
    );
  }

  validateInputValueLengthByModelLength(model, inputValue) {
    const inputValueLength = inputValue.length;
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
