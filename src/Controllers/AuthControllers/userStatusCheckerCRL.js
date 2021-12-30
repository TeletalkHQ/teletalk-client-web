import { userStatusCheckerAPI } from "~/APIs/Auth/userStatusCheckerAPI";

import { authInitialState } from "~/Variables/constants/Initials/initialStates";
import { authActions, globalActions } from "~/Variables/constants/actions";

const { userState } = authActions;
const { backdropState } = globalActions;
const userStatusCheckerCRL = () => {
	return async (dispatch) => {
		try {
			const response = await userStatusCheckerAPI();

			const { user } = response.data;

			delete user.token;

			dispatch({
				type: userState.type,
				payload: user,
			});
		} catch (error) {
			console.log("userStatusCheckerCRL", error);
			localStorage.clear();

			dispatch({
				type: userState.type,
				payload: authInitialState.userState,
			});
		} finally {
			dispatch({ type: backdropState.type, payload: { open: false } });
		}
	};
};

export { userStatusCheckerCRL };
