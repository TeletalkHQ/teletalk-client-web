import { signInAPI } from "~/APIs/Auth/signInAPI";

import { initialState } from "~/Variables/constants/initialStates";
import jwtDecode from "jwt-decode";

//FIXME //? You know what needs to be done!
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

			const verifyToken = response.data.token;

			localStorage.setItem("verifyToken", verifyToken);

			const decodedToken = jwtDecode(verifyToken);

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
