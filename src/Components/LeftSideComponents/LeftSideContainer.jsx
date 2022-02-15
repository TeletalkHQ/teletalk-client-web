import { Box } from "@mui/material";

import ChatList from "~/Components/LeftSideComponents/ChatList";

import { appDrawerAction } from "~/Actions/GlobalActions/globalActions";

import { useMyContext } from "~/Hooks/useMyContext";

import SearchBar from "~/Components/LeftSideComponents/SearchBar";
import SideBarList from "~/Components/LeftSideComponents/SideBarList";

const LeftSideContainer = () => {
	const {
		hooksOutput: { dispatch },
		state: {
			global: { appDrawerState },
			temp: { selectedContact },
			user: { chats, contacts },
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

	return (
		<>
			<Box display="flex" flexDirection="column" style={{ width: "100%", height: "100%" }}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<SearchBar onDrawerIconClick={handleDrawerIconClick} />
				</Box>
				<Box display="flex" justifyContent="space-between" sx={{ height: "100%" }}>
					<SideBarList />
					<ChatList selectedContact={selectedContact} chats={chats} contacts={contacts} />
				</Box>
			</Box>
		</>
	);
};

export default LeftSideContainer;
