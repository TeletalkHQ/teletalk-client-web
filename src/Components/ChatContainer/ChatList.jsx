import { List } from "@mui/material";

import ChatListItem from "~/Components/ChatContainer/ChatListItem";

import { useMyContext } from "~/Hooks/useMyContext";

import { contactClickAction, setMessagesAction } from "~/Actions/TempActions/tempActions";

const ChatList = ({ chats = [], contacts, selectedContact }) => {
	const {
		hooksOutput: { dispatch },
		state: { user },
	} = useMyContext();

	return (
		<>
			<List
				sx={{ width: "80%", overflowY: "scroll", height: "100%", scrollBehavior: "smooth" }}
			>
				{(() => {
					try {
						const chatList = chats?.map((chat, index) => {
							const messages = chat.messages;

							console.log(messages);
							const lastMessage = messages[messages.length - 1];

							const senderID = lastMessage.messageSender.senderID;

							const sender =
								contacts.find((contact) => contact.privateID === senderID) || user;

							const findParticipant = chat.participants.find(
								(participant) => participant?.participantID === selectedContact?.privateID,
							);

							return (
								<ChatListItem
									key={index}
									message={lastMessage.message}
									name={`${sender?.firstName} ${sender?.lastName}`}
									selected={!!findParticipant}
									onChatListItemClick={() => {
										dispatch(
											contactClickAction({
												selectedContact: sender,
											}),
										);
										dispatch(setMessagesAction({ messages }));
									}}
								/>
							);
						});

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
