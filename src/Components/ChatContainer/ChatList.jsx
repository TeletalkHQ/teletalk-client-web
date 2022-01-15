import { List } from "@mui/material";

import ChatListItem from "~/Components/ChatContainer/ChatListItem";

const ChatList = ({ selectedChat, chats = [] }) => {
	return (
		<>
			<List
				sx={{ width: "80%", overflowY: "scroll", height: "100%", scrollBehavior: "smooth" }}
			>
				{(() => {
					try {
						const chatList = chats?.map((chat, index) => {
							// const findParticipant = item.participants.find(
							// 	(participant) => participant.participantID === );

							const messages = chat.messages;

							const lastMessage = messages[messages.length - 1];

							const senderName = lastMessage
							
							return (
								<ChatListItem
									key={index}
									message={lastMessage.messageText}
									name={}
									selected={selectedChat.chatID === chat?.chatID}
								/>
							);
						});

						console.log(chatList);

						return chatList;
					} catch (error) {
						console.log("ChatList", error);
						return null;
					}
				})()}
			</List>
		</>
	);
};

export default ChatList;
