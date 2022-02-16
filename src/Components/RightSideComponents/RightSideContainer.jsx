import { Box } from "@mui/material";

import MessageInput from "~/Components/RightSideComponents/MessageInput";
import MessageList from "~/Components/RightSideComponents/MessageList";
import ChatBar from "~/Components/RightSideComponents/ChatBar";

import { useMyContext } from "~/Hooks/useMyContext";

import {
	contactClickAction,
	messageInputOnChangeAction,
} from "~/Actions/TempActions/tempActions";

import { initialContact } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { sendNewMessageCRL } from "~/Controllers/MessageControllers/sendPrivateMessageCRL";
import { useEffect } from "react";
import { getAllChatMessagesCRL } from "~/Controllers/MessageControllers/getAllChatMessagesCRL";

const RightSideContainer = () => {
	const {
		state: {
			temp: {
				selectedContact: { firstName, lastName, privateID },
				selectedContact,
				messageInputText,
			},
			user,
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	useEffect(() => {
		try {
			const chat = user.chats.find((chat) => {
				return chat.participants.find(
					(participant) => participant.participantID === privateID,
				);
			});

			if (chat) {
				const intervalID = setInterval(() => {
					dispatch(getAllChatMessagesCRL({ chatID: chat.chatID }));
				}, 1000);

				return () => {
					clearInterval(intervalID);
				};
			}
		} catch (error) {
			console.log("RightSideContainer useEffect for chat updater", error);
		}
	}, []);

	const handleInputChange = ({ target: { value } }) => {
		dispatch(messageInputOnChangeAction({ messageInputText: value }));
	};

	const handleAddNewMessage = async () => {
		dispatch(sendNewMessageCRL());
	};

	const handleMessageContainerCloseClick = () => {
		dispatch(contactClickAction({ selectedContact: { ...initialContact } }));
	};

	//FIXME
	const chat = user.chats.find((chat) => {
		return chat.participants.find((participant) => participant.participantID === privateID);
	});

	if (!chat && !selectedContact) {
		return null;
	}

	return (
		<Box
			flexDirection="column"
			sx={{ width: "100%", height: "100%" }}
			justifyContent="space-between"
			alignItems="center"
			display="flex"
		>
			<Box sx={{ height: "50px", width: "100%" }}>
				<ChatBar
					onMessageContainerCloseClick={handleMessageContainerCloseClick}
					chatName={`${firstName} ${lastName}`}
				/>
			</Box>

			<Box sx={{ height: "100%", width: "100%" }}>
				<MessageList messages={chat?.messages || []} user={user} />
			</Box>

			<Box sx={{ width: "100%" }}>
				<MessageInput
					messageInputText={messageInputText}
					onAddNewMessage={handleAddNewMessage}
					onInputChange={handleInputChange}
				/>
			</Box>
		</Box>
	);
};

export default RightSideContainer;
