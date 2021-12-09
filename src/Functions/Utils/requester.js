import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";
import { baseURL } from "~/Variables/constants/requestConstants";

const initialOptions = { method: "GET", url: "", data: {}, headers: {} };

const requester = async (options = initialOptions) => {
	try {
		if (!options.url) {
			const error = "Yo! you forget send me url";
			throw error;
		}

		const finalOptions = { ...initialOptions, ...options, url: baseURL + options.url };

		if (!Object.keys(finalOptions.data).length) {
			delete options.data;
		}

		const response = await myAxios(finalOptions);

		console.log(response);

		const checkedResponse = responseHandler(response);

		return checkedResponse;
	} catch (error) {
		console.log("requester catch, error:", error);

		throw error;
	}
};

export { requester };
