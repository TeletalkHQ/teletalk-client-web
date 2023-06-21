import { notificationManager } from "~/classes/NotificationManager";
import { enErrorMessages } from "~/data/enErrorMessages";
import { NativeError, NativeModel } from "~/types";
import { ModelName } from "~/types/models";

import { stuffStore } from "./StuffStore";

class CommonTasks {
  correctErrorsAndPrint(errors: NativeError[]) {
    errors.forEach((item) => {
      notificationManager.submitErrorNotification({
        ...item,
        message: enErrorMessages[item.reason as keyof typeof enErrorMessages],
      });
    });
  }

  isValueLengthInBetweenMinMax(modelName: ModelName, value: string) {
    const { maxLength, minLength } = stuffStore.models[
      modelName
    ] as NativeModel;

    const inputValueLength = value.length;

    return inputValueLength >= minLength && inputValueLength <= maxLength;
  }

  isValueLengthEqualToLength(modelName: ModelName, value: string) {
    return (
      value.length === (stuffStore.models[modelName] as NativeModel).length
    );
  }
}

const commonTasks = new CommonTasks();

export { commonTasks, CommonTasks };
