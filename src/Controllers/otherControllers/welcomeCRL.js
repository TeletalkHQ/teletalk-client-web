import { welcomeAPI } from "~/APIs/Others/welcomeAPI";

const welcomeCRL = () => {
	return async (dispatch, getState) => {
		try {
			const response = await welcomeAPI();

			dispatch({ type: "WELCOME", payload: response.data });
		} catch (error) {
			console.log("welcomeCRL catch", error);
		}
	};
};

export { welcomeCRL };
