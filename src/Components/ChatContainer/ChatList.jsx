import {
	// Avatar,
	Box,
	// Grid,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	TextField,
} from "@mui/material";
import { appDrawerAction } from "~/Actions/GlobalActions/globalActions";
import { useMyContext } from "~/Hooks/useMyContext";

import { initialValues } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import ChatListItem from "./ChatListItem";

const { allChats, bot, channels, unread, editChats, groups, personal, menu, search } =
	initialValues;

const sidebarList = [allChats, unread, personal, channels, groups, bot, editChats];

const ChatList = () => {
	const {
		state,
		hooksOutput: { dispatch },
	} = useMyContext();

	return (
		<>
			<Box display="flex" flexDirection="column" style={{ width: "100%" }}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Box>
						<IconButton
							onClick={() =>
								dispatch(
									appDrawerAction({
										anchor: state.global.appDrawerState.currentAnchor,
										open: true,
									}),
								)
							}
						>
							<menu.Icon />
						</IconButton>
					</Box>
					<Box p={1} sx={{ width: "100%" }}>
						<TextField
							fullWidth
							size="small"
							placeholder="Search"
							InputProps={{
								sx: {
									borderRadius: "10px",
								},
								startAdornment: (
									<InputAdornment position="start">
										<search.Icon />
									</InputAdornment>
								),
							}}
						/>
					</Box>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<List sx={{ width: "20%" }}>
						{sidebarList.map((item, index) => {
							return (
								<ListItem
									button
									key={index}
									selected={index === 4}
									sx={{
										display: "flex",
										flexDirection: "column",
										height: "65px",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<item.Icon
									// fontSize="small"
									/>
								</ListItem>
							);
						})}
					</List>
					<List sx={{ width: "80%" }}>
						{Array.from({ length: 5 }).map((item, index) => {
							return <ChatListItem key={index} selected={index === 3} />;
						})}
					</List>
				</Box>
			</Box>
		</>
	);
};

export default ChatList;
