import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";
import { handleMakeSnack } from "~/Functions/Others/Injectors/snackbarInjector";

import { initialRequestOptions } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { errorInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { configs } from "~/Configs/configs";

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

		successResponseLogger && console.log(checkedResponse);

		return checkedResponse;
	} catch (error) {
		failureResponseLogger && console.log("requester catch, error:", error);

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
