import { signInAPI } from "~/APIs/Auth/signInAPI";

import { initialState } from "~/Variables/constants/Initials/InitialStates/initialStates";
import { initialViewMode } from "~/Variables/constants/Initials/InitialValues/initialValues";
import {
	userActions,
	globalActions,
} from "~/Variables/constants/Initials/InitialActions/initialActions";

const { loadingAction, userAction } = userActions;
const { viewModeAction } = globalActions;

const signInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			const {
				user: { phoneNumber, countryCode, countryName },
			} = getState();

			dispatch({ type: loadingAction.type, payload: { loading: true } });

			const response = await signInAPI({ phoneNumber, countryCode, countryName });

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
