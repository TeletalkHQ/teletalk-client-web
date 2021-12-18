import { signInAPI } from "~/APIs/Auth/signInAPI";

import { initialState } from "~/Variables/constants/initialStates";
import jwtDecode from "jwt-decode";

const signInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			const {
				auth: {
					user: { cellphone },
				},
			} = getState();

			dispatch({ type: "LOADING", payload: true });

			const response = await signInAPI({ cellphone });

			localStorage.setItem("token", response.data.token);

			const decodedToken = jwtDecode(response.data.token);

			dispatch({
				type: "USER_DATA",
				payload: {
					...response.data,
					verifyCode: decodedToken.pass,
				},
			});
			dispatch({ type: "VIEW_MODE_ONCHANGE", payload: "verifySignIn" });

			dispatch({ type: "LOADING", payload: false });
			return response;
		} catch (error) {
			console.log("signInCRL catch", error);
			dispatch({ type: "LOADING", payload: false });
		}
	};
};

export { signInCRL };
