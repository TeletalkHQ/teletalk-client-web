import { verifySignInAPI } from "~/APIs/Auth/verifySignInAPI";

import { initialState } from "~/Variables/constants/Initials/initialStates";
import { initialViewMode } from "~/Variables/constants/Initials/initialValues";
import { authActions, globalActions } from "~/Variables/constants/Initials/initialActions";

const { loadingAction, userAction } = authActions;
const { viewModeAction } = globalActions;

const verifySignInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			dispatch({ type: loadingAction.type, payload: { loading: true } });

			const {
				auth: {
					userState: { verifyCode },
				},
			} = getState();

			const verifyToken = localStorage.getItem("verifyToken");

			if (!verifyToken) {
				const error = "verifyToken is not defined";

				dispatch({ type: viewModeAction.type, payload: { viewMode: initialViewMode.signIn } });

				throw error;
			}

			const response = await verifySignInAPI({ verifyCode, token: verifyToken });

			const { user } = response.data;

			const mainToken = user.token;

			delete user.token;

			localStorage.setItem("mainToken", mainToken);

			dispatch({
				type: userAction.type,
				payload: user,
			});
		} catch (error) {
			console.log("verifySignInCRL", error);
		} finally {
			dispatch({ type: loadingAction.type, payload: { loading: false } });
		}
	};
};

export { verifySignInCRL };
