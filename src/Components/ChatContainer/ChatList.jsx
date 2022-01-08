import { List } from "@mui/material";

import ChatListItem from "~/Components/ChatContainer/ChatListItem";

const ChatList = ({ selectedChat, chats = [] }) => {
	return (
		<>
			<List
				sx={{ width: "80%", overflowY: "scroll", height: "100%", scrollBehavior: "smooth" }}
			>
				{chats?.map((item, index) => {
					return <ChatListItem key={index} selected={selectedChat === item?.privateID} />;
				})}
			</List>
		</>
	);
};

export default ChatList;
