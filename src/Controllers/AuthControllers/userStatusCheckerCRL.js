import { userStatusCheckerAPI } from "~/APIs/Auth/userStatusCheckerAPI";

import { userInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

import { userAction } from "~/Actions/UserActions/userActions";
import { backdropAction, viewModeAction } from "~/Actions/GlobalActions/globalActions";
import { initialViewMode } from "~/Variables/Constants/Initials/InitialValues/initialValues";

const userStatusCheckerCRL = () => {
	return async (dispatch) => {
		try {
			const response = await userStatusCheckerAPI();

			const { user } = response.data;

			delete user.token;

			dispatch(userAction({ ...user }));

			return { user };
		} catch (error) {
			console.log("userStatusCheckerCRL", error);
			//TODO Do this in special cases =>
			if (error.statusCode === 401) {
				localStorage.clear();
				dispatch(viewModeAction({ viewMode: initialViewMode.signIn }));
			}

			dispatch(userAction({ ...userInitialState }));
		} finally {
			dispatch(backdropAction({ backdropState: { open: false } }));
		}
	};
};

export { userStatusCheckerCRL };
