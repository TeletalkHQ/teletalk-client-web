import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";

const initialOptions = { method: "GET", url: "", data: {}, headers: {} };

const requester = async (options = initialOptions) => {
	try {
		if (!options.url) {
			const error = "Yo! you forget send me url!!!";
			throw error;
		}

		const finalOptions = { ...initialOptions, ...options };

		if (!Object.keys(finalOptions.data).length) {
			delete options.data;
		}

		const response = await myAxios(finalOptions);

		const checkedResponse = responseHandler(response);

		console.log(checkedResponse);

		return checkedResponse;
	} catch (error) {
		console.log("requester catch, error:", error);

		throw error;
	}
};

export { requester };
