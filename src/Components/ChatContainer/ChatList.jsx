import { List } from "@mui/material";

import ChatListItem from "~/Components/ChatContainer/ChatListItem";

const ChatList = () => {
	return (
		<>
			<List
				sx={{ width: "80%", overflowY: "scroll", height: "100%", scrollBehavior: "smooth" }}
			>
				{Array.from({ length: 5 }).map((item, index) => {
					return <ChatListItem key={index} selected={index === 3} />;
				})}
			</List>
		</>
	);
};

export default ChatList;
