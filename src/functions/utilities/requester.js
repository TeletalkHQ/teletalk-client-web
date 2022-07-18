import { appConfigs } from "classes/AppConfigs";
import { notificationManager } from "classes/NotificationManager";

import { customAxios } from "functions/utilities/customAxios";
import { responseChecker } from "functions/utilities/ajaxUtils";

import { notifications } from "variables/others/notifications";

const requester = async (options) => {
  try {
    const response = await customAxios(options);

    const checkedResponse = responseChecker(response);

    appConfigs.checkAndExecute(
      appConfigs.configs.requester.logSuccessfulResponse,
      () => console.log(checkedResponse)
    );

    return checkedResponse;
  } catch (error) {
    appConfigs.checkAndExecute(
      appConfigs.configs.requester.logFailureResponse,
      () => console.log("requester catch, error:", error)
    );

    if (!window?.navigator?.onLine || error?.code === "ECONNABORTED") {
      notificationManager.submitErrorNotification(
        notifications.localErrors.ECONNABORTED
      );
    }

    throw error;
  }
};

export { requester };
