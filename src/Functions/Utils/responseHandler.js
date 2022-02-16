import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";
import { userInitializer } from "~/Functions/Helpers/userInitializer";

import { viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { userAction } from "~/Actions/UserActions/userActions";

import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const responseHandler = (response) => {
	try {
		const rejection = () => {
			throw response;
		};

		const statusCode = response.statusCode || response.status;

		console.log("responseHandler", statusCode);

		if (statusCode >= 400 && statusCode < 500) {
			switch (statusCode) {
				case 400:
					appDispatch({ type: "request result", payload: "BAD REQUEST!" });
					rejection();
					break;

				case 401:
					localStorage.clear();
					appDispatch(userAction({ ...userInitializer() }));
					appDispatch(
						viewModeAction({
							viewMode: initialViewMode.signIn,
						}),
					);
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
