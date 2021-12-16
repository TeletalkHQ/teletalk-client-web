import { verifySignInAPI } from "~/APIs/Auth/verifySignInAPI";
import { initialState } from "~/Variables/constants/initialStates";

const verifySignInCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			dispatch({ type: "LOADING", payload: true });

			const {
				auth: {
					user: { verifyCode },
				},
			} = getState();

			const response = await verifySignInAPI({ verifyCode });

			const { token, ...user } = response.data;

			localStorage.setItem("token", token);

			dispatch({ type: "USER_DATA", payload: user });
			dispatch({ type: "LOADING", payload: false });
		} catch (error) {
			console.log("verifySignInCRL", error);
			dispatch({ type: "LOADING", payload: false });
		}
	};
};

export { verifySignInCRL };
