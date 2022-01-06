import { signInAPI } from "~/APIs/Auth/signInAPI";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

const signInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			const {
				user: { phoneNumber, countryCode, countryName },
			} = getState();

			dispatch(loadingAction({ loading: true }));

			const response = await signInAPI({ phoneNumber, countryCode, countryName });

			const verifyToken = response.data.token;

			localStorage.setItem("verifyToken", verifyToken);

			dispatch(
				userAction({
					...response.data,
				}),
			);

			dispatch(viewModeAction({ viewMode: initialViewMode.verifySignIn }));

			return response;
		} catch (error) {
			console.log("signInCRL catch", error);
		} finally {
			dispatch(loadingAction({ loading: false }));
		}
	};
};

export { signInCRL };
