import { sendPrivateMessageAPI } from "~/APIs/MessageAPIs/sendPrivateMessageAPI";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { userAction } from "~/Actions/UserActions/userActions";
import { messageInputOnChangeAction } from "~/Actions/TempActions/tempActions";

const sendNewMessageCRL = () => {
	return async (dispatch, getState = initialState) => {
		try {
			const {
				temp: {
					messageInputText,
					selectedContact: { privateID },
				},
				user,
			} = getState();

			const response = await sendPrivateMessageAPI({
				participantID: privateID,
				message: messageInputText,
			});

			const { chatID, newMessage } = response.data;

			const copyUser = { ...user };

			const chatIndex = copyUser.chats?.findIndex((chat) => chat?.chatID === chatID);

			if (chatIndex !== -1) {
				console.log(chatIndex);
				const chat = copyUser.chats[chatIndex] || {
					chatID,
					messages: [newMessage],
				};
				const messages = handleAddNewMessage({ newMessage, messages: chat.messages || [] });

				const newChat = { ...chat, messages };

				console.log(newChat);
				copyUser.chats.splice(chatIndex, 1, newChat);

				console.log(copyUser);
			}

			dispatch(userAction({ chats: copyUser.chats }));
			dispatch(messageInputOnChangeAction({ messageInputText: "" }));
		} catch (error) {
			console.log("sendNewMessageCRL", error);
		}
	};
};

const handleAddNewMessage = ({ messages, newMessage }) => {
	const copyMessages = [...messages];

	copyMessages.push(newMessage);

	return copyMessages;
};

export { sendNewMessageCRL };
