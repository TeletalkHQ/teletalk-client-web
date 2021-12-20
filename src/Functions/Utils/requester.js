import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";

import { initialRequestOptions } from "~/Variables/constants/initialOptions";

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

		//TODO Need fix for mainToken
		const token = options?.data?.token || JSON.parse(localStorage.getItem("mainToken"))?.value;

		console.log(options);
		if (!Object.keys(finalOptions.data).length) {
			delete options.data;
		}

		const response = await myAxios({
			...finalOptions,
			headers: { ...finalOptions.headers, Authorization: `Bearer ${token}` },
		});

		const checkedResponse = responseHandler(response);

		console.log(checkedResponse);

		return checkedResponse;
	} catch (error) {
		console.log("requester catch, error:", error);

		throw error;
	}
};

export { requester };
