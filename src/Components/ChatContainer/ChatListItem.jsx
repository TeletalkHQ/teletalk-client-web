import { Avatar, Box, ListItem } from "@mui/material";

const ChatListItem = ({ selected }) => {
	return (
		<ListItem
			button
			selected={selected}
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
};

export default ChatListItem;
