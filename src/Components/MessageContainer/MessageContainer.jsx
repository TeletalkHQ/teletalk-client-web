import { Box } from "@mui/material";

import MessageInput from "~/Components/MessageContainer/MessageInput";
import MessageList from "~/Components/MessageContainer/MessageList";
import ChatBar from "~/Components/MessageContainer/ChatBar";

import { useMyContext } from "~/Hooks/useMyContext";

import {
	contactClickAction,
	messageInputOnChangeAction,
} from "~/Actions/TempActions/tempActions";

import { initialContact } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { sendNewMessageCRL } from "~/Controllers/MessageControllers/sendNewMessageCRL";

const MessageContainer = () => {
	const {
		state: {
			temp: {
				selectedContact: { firstName, lastName },
				messageInputText,
				messages,
			},
			user,
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleInputChange = ({ target: { value } }) => {
		dispatch(messageInputOnChangeAction({ messageInputText: value }));
	};

	const handleAddNewMessage = async () => {
		dispatch(sendNewMessageCRL());
	};

	const handleMessageContainerCloseClick = () => {
		dispatch(contactClickAction({ selectedContact: { ...initialContact } }));
	};

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
				<MessageList messages={messages} user={user} />
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

export default MessageContainer;
