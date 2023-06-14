import { notificationManager } from "~/classes/NotificationManager";

import { enErrorMessages } from "~/data/enErrorMessages";
import { ModelName } from "~/types/models";

import { variables } from "~/variables";
import { stuffStore } from "./StuffStore";

class CommonTasks {
  correctErrorsAndPrint(errors: any) {
    errors.forEach((errorItem: any) => {
      notificationManager.submitErrorNotification({
        ...errorItem,
        message: enErrorMessages[errorItem.reason],
      });
    });
  }

  isValueLengthInBetweenMinMax(modelName: ModelName, value: string) {
    const { maxLength, minLength } = stuffStore.models[modelName];

    const inputValueLength = value.length;

    return inputValueLength >= minLength && inputValueLength <= maxLength;
  }

  isValueLengthEqualToLength(modelName: ModelName, value: string) {
    return value.length === stuffStore.models[modelName].length;
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
