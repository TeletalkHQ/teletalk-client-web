import { persistentStorage } from "classes/PersistentStorage";

import { configs } from "configs/configs";

import { customAxios } from "functions/utilities/customAxios";
import { responseHandler } from "functions/utilities/ajaxUtils";
import { handleMakeSnack } from "functions/others/injectors/snackbarInjector";
import { appDispatch } from "functions/others/injectors/dispatchInjector";

import { initialRequestOptions } from "variables/initials/initialOptions/initialOptions";
import { errorInitialActions } from "variables/initials/initialActions/errorInitialActions";
import { PERSISTENT_STORAGE_KEYS } from "variables/initials/initialValues/initialValues";

const { logSuccessfulResponse, logFailureResponse } = configs.requester;

const requester = async (options = initialRequestOptions) => {
  try {
    const finalOptions = {
      ...initialRequestOptions,
      ...options,
      data: { ...initialRequestOptions.data, ...options?.data },
      headers: { ...initialRequestOptions.headers, ...options?.headers },
      token:
        options?.token ||
        persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN),
    };

    if (!finalOptions.url) {
      const error = "You forget to set my url!!!";
      throw error;
    }

    finalOptions.headers.Authorization = `Bearer ${finalOptions.token}`;

    if (options.data && !Object.keys(options?.data)?.length) {
      delete finalOptions.data;
    }

    const response = await customAxios(finalOptions);

    const checkedResponse = responseHandler(response);

    logSuccessfulResponse && console.log(checkedResponse);

    return checkedResponse;
  } catch (error) {
    logFailureResponse && console.log("requester catch, error:", error);

    if (!window?.navigator?.onLine) {
      appDispatch({ type: errorInitialActions.eConnAbortedAction.type });
      handleMakeSnack("ECONNABORTED", { variant: "error" });
    } else if (error?.code === "ECONNABORTED") {
      appDispatch({ type: errorInitialActions.eConnAbortedAction.type });
      handleMakeSnack("ECONNABORTED", { variant: "error" });
    }

    throw error;
  }
};

export { requester };
