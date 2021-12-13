import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

const responseHandler = (response) => {
	try {
		const rejection = () => {
			throw response;
		};

		const statusCode = response.data.statusCode || response.status;

		if (statusCode >= 400 && statusCode < 500) {
			switch (statusCode) {
				case 400:
					appDispatch({ type: "request result", payload: "BAD REQUEST!" });
					rejection();
					break;

				case 401:
					localStorage.clear();
					appDispatch({ type: "USER_CLEARED" });
					rejection();
					break;

				case 805:
					appDispatch();
					rejection();
					break;

				case 804:
					appDispatch();
					rejection();
					break;

				case 823:
					appDispatch();
					rejection();
					break;

				case 826:
					appDispatch();
					rejection();
					break;

				default:
					appDispatch();
					rejection();
					break;
			}
		} else if (statusCode >= 500 && statusCode < 600) {
			switch (statusCode) {
				case 500:
					appDispatch({ type: "reject", payload: response });
					rejection();
					break;

				default:
					appDispatch();
					rejection();
					break;
			}
		} else if (statusCode >= 600) {
			//...
			rejection();
		}

		return response;
	} catch (error) {
		console.log("responseHandler catch", error);
		throw error;
	}
};

export { responseHandler };
