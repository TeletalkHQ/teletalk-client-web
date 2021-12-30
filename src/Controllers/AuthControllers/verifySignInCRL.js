import { verifySignInAPI } from "~/APIs/Auth/verifySignInAPI";

import { initialState } from "~/Variables/constants/Initials/initialStates";
import { initialViewMode } from "~/Variables/constants/Initials/initialValues";
import { authActions, globalActions } from "~/Variables/constants/actions";

const { loading, userState } = authActions;
const { viewMode } = globalActions;

const verifySignInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			dispatch({ type: loading.type, payload: { loading: true } });

			const {
				auth: {
					userState: { verifyCode },
				},
			} = getState();

			const verifyToken = localStorage.getItem("verifyToken");

			if (!verifyToken) {
				const error = "verifyToken is not defined";

				dispatch({ type: viewMode.type, payload: { viewMode: initialViewMode.signIn } });

				throw error;
			}

			const response = await verifySignInAPI({ verifyCode, token: verifyToken });

			const { user } = response.data;

			const mainToken = user.token;

			delete user.token;

			localStorage.setItem("mainToken", mainToken);

			dispatch({
				type: userState.type,
				payload: user,
			});
		} catch (error) {
			console.log("verifySignInCRL", error);
		} finally {
			dispatch({ type: loading.type, payload: { loading: false } });
		}
	};
};

export { verifySignInCRL };
