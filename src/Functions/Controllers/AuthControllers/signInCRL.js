import { signInAPI } from "~/APIs/Auth/signInAPI";

const signInCRL = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await signInAPI(data);

			console.log(response);

			dispatch({ type: "USER_DATA", payload: response });
			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export { signInCRL };
