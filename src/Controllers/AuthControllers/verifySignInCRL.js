import { verifySignInAPI } from "~/APIs/Auth/verifySignInAPI";

import { loadingAction, userAction } from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const verifySignInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			dispatch(loadingAction({ loading: true }));

			const {
				user: { verifyCode },
			} = getState();

			const verifyToken = localStorage.getItem("verifyToken");

			if (!verifyToken) {
				const error = "verifyToken is not defined";

				dispatch(viewModeAction({ viewMode: initialViewMode.signIn }));

				throw error;
			}

			const response = await verifySignInAPI({ verifyCode, token: verifyToken });

			const { user } = response.data;

			const mainToken = user.token;

			delete user.token;

			localStorage.setItem("mainToken", mainToken);

			dispatch(userAction({ ...user }));
		} catch (error) {
			console.log("verifySignInCRL", error);
		} finally {
			dispatch(loadingAction({ loading: false }));
		}
	};
};

export { verifySignInCRL };
