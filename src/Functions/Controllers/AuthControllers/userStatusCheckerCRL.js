import { userStatusCheckerAPI } from "~/APIs/Auth/userStatusCheckerAPI";
import { authInitialState } from "~/Variables/constants/initialStates";

const userStatusCheckerCRL = () => {
	return async (dispatch, getState) => {
		try {
			const response = await userStatusCheckerAPI();

			console.log(response);
		} catch (error) {
			console.log("userStatusCheckerCRL", error);
			localStorage.clear();
			dispatch({ type: "USER_DATA", payload: authInitialState.user });
		} finally {
			dispatch({ type: "BACKDROP_STATE_CHANGE", payload: { open: false } });
		}
	};
};

export { userStatusCheckerCRL };
