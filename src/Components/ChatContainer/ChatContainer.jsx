import { Box } from "@mui/material";

import ChatList from "~/Components/ChatContainer/ChatList";

import { appDrawerAction } from "~/Actions/GlobalActions/globalActions";

import { useMyContext } from "~/Hooks/useMyContext";

import SearchBar from "~/Components/ChatContainer/SearchBar";
import SideBarList from "~/Components/ChatContainer/SideBarList";

const ChatContainer = () => {
	const {
		hooksOutput: { dispatch },
		state: {
			global: { appDrawerState },
			temp: { selectedContact },
		},
	} = useMyContext();

	const handleDrawerIconClick = () => {
		dispatch(
			appDrawerAction({
				appDrawerState: {
					...appDrawerState,
					anchor: {
						...appDrawerState.anchor,
						[appDrawerState.currentAnchor]: true,
					},
				},
			}),
		);
	};

	const selectedChat = selectedContact.privateID;

	return (
		<>
			<Box display="flex" flexDirection="column" style={{ width: "100%", height: "100%" }}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<SearchBar onDrawerIconClick={handleDrawerIconClick} />
				</Box>
				<Box display="flex" justifyContent="space-between" sx={{ height: "100%" }}>
					<SideBarList />
					<ChatList selectedChat={selectedChat} />
				</Box>
			</Box>
		</>
	);
};

export default ChatContainer;
