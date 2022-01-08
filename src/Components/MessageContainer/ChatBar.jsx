import { Box, IconButton, Paper, Avatar, Typography } from "@mui/material";
import { Close, MoreVert } from "@mui/icons-material";

const ChatBar = ({ chatName, onMessageContainerCloseClick }) => {
	return (
		<>
			<Paper sx={{ width: "100%", height: "100%" }}>
				<Box
					display="flex"
					sx={{ width: "100%", height: "100%" }}
					justifyContent="space-between"
					alignItems="center"
				>
					<Box>
						<IconButton onClick={onMessageContainerCloseClick}>
							<Close />
						</IconButton>
					</Box>
					<Box display="flex" alignItems="center">
						<Avatar alt={chatName} />
						<Typography>{chatName}</Typography>
					</Box>
					<Box>
						<IconButton>
							<MoreVert />
						</IconButton>
					</Box>
				</Box>
			</Paper>
		</>
	);
};

export default ChatBar;
