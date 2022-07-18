import { persistentStorage } from "classes/PersistentStorage";

import { configs } from "configs/configs";

import { customAxios } from "functions/utilities/customAxios";
import { responseChecker } from "functions/utilities/ajaxUtils";

import { initialRequestOptions } from "variables/initials/initialOptions/initialOptions";

import { PERSISTENT_STORAGE_KEYS } from "variables/initials/initialValues/initialValues";
import { notificationManager } from "classes/NotificationManager";
import { notifications } from "variables/others/notifications";

const { logSuccessfulResponse, logFailureResponse } = configs.requester;

const requester = async (options = initialRequestOptions) => {
  try {
    //TODO Move it to ApiBuilder sendRequest method
    const finalOptions = {
      ...initialRequestOptions,
      ...options,
      data: { ...initialRequestOptions.data, ...options?.data },
      headers: { ...initialRequestOptions.headers, ...options?.headers },
      token:
        options?.token ||
        persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN),
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

    //TODO Move it to AppConfig
    logSuccessfulResponse && console.log(checkedResponse);

    return checkedResponse;
  } catch (error) {
    logFailureResponse && console.log("requester catch, error:", error);

    if (!window?.navigator?.onLine || error?.code === "ECONNABORTED") {
      notificationManager.submitErrorNotification(
        notifications.localErrors.ECONNABORTED
      );
    }

    throw error;
  }
};

export { requester };
