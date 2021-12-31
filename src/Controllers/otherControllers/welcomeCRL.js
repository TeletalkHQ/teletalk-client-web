import { welcomeAPI } from "~/APIs/Others/welcomeAPI";
import { otherActions } from "~/Variables/constants/initialActions";

const welcomeCRL = () => {
	return async (dispatch, getState) => {
		try {
			const response = await welcomeAPI();

			dispatch({
				type: otherActions.welcomeAction.type,
				payload: {
					message: response.data.message,
				},
			});
		} catch (error) {
			console.log("welcomeCRL catch", error);
		}
	};
};

export { welcomeCRL };
