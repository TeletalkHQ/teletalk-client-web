import { signInAPI } from "~/APIs/Auth/signInAPI";

import { initialState } from "~/Variables/constants/Initials/initialStates";
import { initialViewMode } from "~/Variables/constants/Initials/initialValues";
import { authActions, globalActions } from "~/Variables/constants/initialActions";

const { loading, userState } = authActions;
const { viewMode } = globalActions;

const signInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			const {
				auth: {
					userState: { cellphone },
				},
			} = getState();

			dispatch({ type: loadingAction.type, payload: { loading: true } });

			const response = await signInAPI({ cellphone });

			const verifyToken = response.data.token;

			localStorage.setItem("verifyToken", verifyToken);

			dispatch({
				type: userAction.type,
				payload: {
					...response.data,
				},
			});

			dispatch({
				type: viewModeAction.type,
				payload: { viewMode: initialViewMode.verifySignIn },
			});

			return response;
		} catch (error) {
			console.log("signInCRL catch", error);
		} finally {
			dispatch({ type: loadingAction.type, payload: { loading: false } });
		}
	};
};

export { signInCRL };