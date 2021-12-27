import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";

import { initialRequestOptions } from "~/Variables/constants/initialOptions";
import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";
import { handleMakeSnack } from "~/Functions/Others/Injectors/snackbarInjector";

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
		const token = options?.token || localStorage.getItem("mainToken");

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
			appDispatch({ type: "ECONNABORTED" });
			handleMakeSnack("ECONNABORTED", { variant: "error" });
		}

		throw error;
	}
};

export { requester };
