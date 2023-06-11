import { windowUtilities } from "~/classes/WindowUtilities";

import { commonNotificationManager } from "~/classes/CommonNotificationManager";
import { notificationManager } from "~/classes/NotificationManager";
import { stuffStore } from "~/classes/StuffStore";

import { utilities } from "~/utilities";

import { variables } from "~/variables";

import { NativeError } from "~/types";

class CommonTasks {
  checkConnAbortNotification(error: NativeError) {
    const isConnectionInterrupted =
      !windowUtilities.isOnline() ||
      utilities.checkErrorCodeIsConnAborted(error?.name);

    if (isConnectionInterrupted)
      commonNotificationManager.submitAbortedConnectionNotification();
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
          ...variables.notification.errors.requirementItemMissing,
          allItems: items,
        };
      }
    });
  }
}

const commonTasks = new CommonTasks();

export { commonTasks, CommonTasks };
