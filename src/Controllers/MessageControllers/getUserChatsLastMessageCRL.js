import { getUserChatsLastMessageAPI } from "~/APIs/MessageAPIs/getUserChatsLastMessageAPI";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const getUserChatsLastMessageCRL = (data) => {
	return async (dispatch, getState = initialState) => {
		try {
			const user = data?.user || getState().user;

			const response = getUserChatsLastMessageAPI();

			console.log(response);
		} catch (error) {
			console.log("getUserChatsLastMessageCRL", error);
		}
	};
};

export { getUserChatsLastMessageCRL };
