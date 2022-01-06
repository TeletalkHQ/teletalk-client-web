import { userStatusCheckerAPI } from "~/APIs/Auth/userStatusCheckerAPI";

import { userInitialState } from "~/Variables/constants/Initials/InitialStates/initialStates";
import {
	userActions,
	globalActions,
} from "~/Variables/constants/Initials/InitialActions/initialActions";

const { userAction } = userActions;
const { backdropAction } = globalActions;
const userStatusCheckerCRL = () => {
	return async (dispatch) => {
		try {
			const response = await userStatusCheckerAPI();

			const { user } = response.data;

			delete user.token;

			dispatch({
				type: userAction.type,
				payload: user,
			});
		} catch (error) {
			console.log("userStatusCheckerCRL", error);
			localStorage.clear();

			dispatch({
				type: userAction.type,
				payload: userInitialState,
			});
		} finally {
			dispatch({ type: backdropAction.type, payload: { open: false } });
		}
	};
};

export { userStatusCheckerCRL };
