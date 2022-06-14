import { myAxios } from "~/functions/utils/myAxios";
import { responseHandler } from "~/functions/utils/responseHandler";
import { PersistentStorage } from "~/classes/PersistentStorage";
import { appDispatch } from "~/functions/others/injectors/dispatchInjector";
import { handleMakeSnack } from "~/functions/others/injectors/snackbarInjector";

import { initialRequestOptions } from "~/variables/constants/initials/initialOptions/initialOptions";
import { errorInitialActions } from "~/variables/constants/initials/initialActions/initialActions";
import { configs } from "~/configs/configs";

const { successResponseLogger, failureResponseLogger } = configs.requester;

const requester = async (options = initialRequestOptions) => {
  try {
    const finalOptions = {
      ...initialRequestOptions,
      ...options,
      data: { ...initialRequestOptions.data, ...options?.data },
      headers: { ...initialRequestOptions.headers, ...options?.headers },
      token: options?.token || PersistentStorage.getItem({ key: "mainToken" }),
    };

    if (!finalOptions.url) {
      const error = "Yo! you forget send me url!!!";
      throw error;
    }

    finalOptions.headers.Authorization = `Bearer ${finalOptions.token}`;

    if (options.data && !Object.keys(options?.data)?.length) {
      delete finalOptions.data;
    }

    const response = await myAxios(finalOptions);

    const checkedResponse = responseHandler(response);

    successResponseLogger && logger.log(checkedResponse);

    return checkedResponse;
  } catch (error) {
    failureResponseLogger && logger.log("requester catch, error:", error);

    if (!window?.navigator?.onLine) {
      appDispatch({ type: errorInitialActions.econnabortedAction.type });
      handleMakeSnack("ECONNABORTED", { variant: "error" });
    } else if (error?.code === "ECONNABORTED") {
      appDispatch({ type: errorInitialActions.econnabortedAction.type });
      handleMakeSnack("ECONNABORTED", { variant: "error" });
    }

    throw error;
  }
};

export { requester };
