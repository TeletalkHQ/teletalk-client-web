import { myAxios } from "~/Functions/Utils/myAxios";
import { responseHandler } from "~/Functions/Utils/responseHandler";

const initialOptions = { method: "GET", url: "", data: {}, headers: { Authorization: "" } };

const requester = async (options = initialOptions) => {
	try {
		const finalOptions = {
			...initialOptions,
			...options,
			data: { ...initialOptions.data, ...options?.data },
			headers: { ...initialOptions.headers, ...options?.headers },
		};

		if (!finalOptions.url) {
			const error = "Yo! you forget send me url!!!";
			throw error;
		}

		const token = localStorage.getItem("token");

		// if (token) {
		// 	finalOptions.headers.Authorization = token;
		// }

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
