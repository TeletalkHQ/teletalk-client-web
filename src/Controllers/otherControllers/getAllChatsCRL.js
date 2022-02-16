import { getAllChatsAPI } from "~/APIs/MessageAPIs/getAllChatsAPI";

import { userAction } from "~/Actions/UserActions/userActions";

const getChatsCRL = () => {
	return async (dispatch, getState) => {
		try {
			const response = await getAllChatsAPI();

			dispatch(userAction({ chats: response.data.chats }));
		} catch (error) {
			console.log("getChatsCRL", error);
		}
	};
};

export { getChatsCRL };
