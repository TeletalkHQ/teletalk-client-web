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

			const verifyToken = localStorage.getItem("verifyToken");

			if (!verifyToken) {
				const error = "verifyToken is not defined";

				dispatch({ type: "VIEW_MODE_ONCHANGE", payload: "signIn" });

				throw error;
			}

			const parseVerifyToken = JSON.parse(verifyToken);

			if (!parseVerifyToken?.value) {
				const error = "verifyToken.value is not defined";

				dispatch({ type: "VIEW_MODE_ONCHANGE", payload: "signIn" });

				throw error;
			}

			const response = await verifySignInAPI({ verifyCode, token: parseVerifyToken.value });

			const { user } = response.data;

			const mainToken = { value: user.token, condition: "alive" };

			localStorage.setItem("mainToken", JSON.stringify(mainToken));

			dispatch({ type: "USER_DATA", payload: user });
			dispatch({ type: "LOADING", payload: false });
		} catch (error) {
			console.log("verifySignInCRL", error);
			dispatch({ type: "LOADING", payload: false });
		}
	};
};

export { verifySignInCRL };
