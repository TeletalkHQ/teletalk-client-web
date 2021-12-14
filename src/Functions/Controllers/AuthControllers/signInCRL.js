import { signInAPI } from "~/APIs/Auth/signInAPI";

import { INITIAL_STATE } from "~/Variables/constants/initialStates";

const signInCRL = () => {
	return async (dispatch, getState = INITIAL_STATE) => {
		try {
			const {
				auth: {
					user: { cellphone },
				},
			} = getState();

			const response = await signInAPI({ cellphone });

			dispatch({ type: "USER_DATA", payload: response.data });
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export { signInCRL };
