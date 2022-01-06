import { userAction } from "~/Actions/UserActions/userActions";
import { requester } from "~/Functions/Utils/requester";

const getChatsCRL = () => {
	return async (dispatch, getState) => {
		try {
			const result = await requester({
				data: { chatID: "Xfl0OHSW-4FrHgX7fUrXHUKGr_jhIqaZApb" },
				// data: { chatID: "-PeGNOjLvLP3ThtpVzNSKWJbrFjjX-dh90N" },
				url: "/chat/private/get/messages",
				method: "POST",
			});

			dispatch(userAction({ chats: result.data.chat }));
		} catch (error) {
			console.log("getChatsCRL", error);
		}
	};
};

export { getChatsCRL };
