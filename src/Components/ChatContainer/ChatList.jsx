import {
	Avatar,
	Box,
	Grid,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	TextField,
} from "@mui/material";
import { useMyContext } from "~/Hooks/useMyContext";

import { globalActions } from "~/Variables/constants/initialActions";
import { initialValues } from "~/Variables/constants/Initials/initialValues";

const { allChats, bot, channels, unread, editChats, groups, personal, menu, search } =
	initialValues;

const sidebarList = [allChats, unread, personal, channels, groups, bot, editChats];

const { appDrawerState } = globalActions;

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
								dispatch({
									type: appDrawerAction.type,
									payload: {
										anchor: state.global.appDrawerState.currentAnchor,
										open: true,
									},
								})
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
								<>
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
								</>
							);
						})}
					</List>
					<List sx={{ width: "80%" }}>
						{Array.from({ length: 5 }).map((item, index) => {
							return (
								<ListItem
									key={index}
									button
									selected={index === 3}
									sx={{
										display: "flex",
										height: "65px",
									}}
								>
									<Box>
										<Avatar />
									</Box>
									<Box display="flex" sx={{ width: "100%" }} flexDirection="column">
										<Box display="flex" justifyContent="space-between" alignItems="center">
											<Box>name</Box>
											<Box>clock</Box>
										</Box>
										<Box display="flex" justifyContent="space-between" alignItems="center">
											<Box>message</Box>
											<Box>icons</Box>
										</Box>
									</Box>
								</ListItem>
							);
						})}
					</List>
				</Box>
			</Box>
		</>
	);
};

export default ChatList;
