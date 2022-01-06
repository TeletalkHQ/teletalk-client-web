import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";

import { initialRequestOptions } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";
import { handleMakeSnack } from "~/Functions/Others/Injectors/snackbarInjector";
import { errorInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";

const requester = async (options = initialRequestOptions) => {
	try {
		const finalOptions = {
			...initialRequestOptions,
			...options,
			data: { ...initialRequestOptions.data, ...options?.data },
			headers: { ...initialRequestOptions.headers, ...options?.headers },
		};

		if (!finalOptions.url) {
			const error = "Yo! you forget send me url!!!";
			throw error;
		}

		//TODO get out token from data!
		const token = options?.data?.token || localStorage.getItem("mainToken");

		finalOptions.headers.Authorization = `Bearer ${token}`;

		if (options.data && !Object.keys(options?.data)?.length) {
			delete finalOptions.data;
		}

		const response = await myAxios(finalOptions);

		const checkedResponse = responseHandler(response);

		console.log(checkedResponse);

		return checkedResponse;
	} catch (error) {
		console.log("requester catch, error:", error);
		if (error.code === "ECONNABORTED") {
			//FIXME
			appDispatch({ type: errorInitialActions.econnabortedAction.type });
			handleMakeSnack("ECONNABORTED", { variant: "error" });
		}

		throw error;
	}
};

export { requester };
