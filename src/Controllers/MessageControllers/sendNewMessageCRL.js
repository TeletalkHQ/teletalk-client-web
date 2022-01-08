import { sendPrivateMessageAPI } from "~/APIs/MessageAPIs/sendPrivateMessageAPI";

import { initialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { userAction } from "~/Actions/UserActions/userActions";

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
				messageText: messageInputText,
			});

			const { chatID, newMessage } = response.data;

			const copyUser = { ...user };

			const chatIndex = copyUser.chats?.findIndex((chat) => chat?.chatID === chatID);

			if (chatIndex !== -1) {
				console.log(chatIndex);
				const chat = copyUser.chats.find((chat) => chat.chatID === chatID) || {
					chatID,
					messages: [newMessage],
				};
				const messages = handleAddNewMessage({ newMessage, messages: chat.messages || [] });

				const newChat = { ...chat, messages };

				copyUser.chats.splice(chatIndex, 1, newChat);
			}

			dispatch(userAction({ chats: copyUser.chats }));

			console.log(copyUser);
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
