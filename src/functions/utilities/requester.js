import { appConfigs } from "classes/AppConfigs";

import { customAxios } from "functions/utilities/customAxios";
import { responseChecker } from "functions/utilities/ajaxUtils";

import { initialRequestOptions } from "variables/initials/initialOptions/initialOptions";

import { notificationManager } from "classes/NotificationManager";
import { notifications } from "variables/others/notifications";
import { userPropsUtilities } from "classes/UserPropsUtilities";

const requester = async (options = initialRequestOptions) => {
  try {
    //TODO Move it to ApiBuilder sendRequest method
    const finalOptions = {
      ...initialRequestOptions,
      ...options,
      data: { ...initialRequestOptions.data, ...options.data },
      headers: { ...initialRequestOptions.headers, ...options?.headers },
      token: options.token || userPropsUtilities.getMainTokenFromStorage(),
    };

    //TODO Move it to ApiBuilder build method
    if (!finalOptions.url) {
      const error = "You forget to set my url!!!";
      throw error;
    }
    //TODO Move it to ApiBuilder sendRequest method
    finalOptions.headers.Authorization = `Bearer ${finalOptions.token}`;

    //TODO Move it to ApiBuilder sendRequest method
    if (options.data && !Object.keys(options?.data)?.length) {
      delete finalOptions.data;
    }

    const response = await customAxios(finalOptions);

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
