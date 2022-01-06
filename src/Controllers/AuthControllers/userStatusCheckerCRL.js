import { userStatusCheckerAPI } from "~/APIs/Auth/userStatusCheckerAPI";

import { userInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

import { userAction } from "~/Actions/UserActions/userActions";
import { backdropAction } from "~/Actions/GlobalActions/globalActions";

const userStatusCheckerCRL = () => {
	return async (dispatch) => {
		try {
			const response = await userStatusCheckerAPI();

			const { user } = response.data;

			delete user.token;

			dispatch(userAction({ ...user }));
		} catch (error) {
			console.log("userStatusCheckerCRL", error);
			localStorage.clear();

			dispatch(userAction({ ...userInitialState }));
		} finally {
			dispatch(backdropAction({ open: false }));
		}
	};
};

export { userStatusCheckerCRL };
