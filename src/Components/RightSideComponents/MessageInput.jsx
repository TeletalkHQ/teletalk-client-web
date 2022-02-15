import { AttachFile, EmojiEmotions, MicNone, Telegram } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField } from "@mui/material";

const MessageInput = ({ onInputChange, onAddNewMessage, messageInputText }) => {
	return (
		<Paper sx={{ width: "100%" }}>
			<Box
				sx={{ width: "100%" }}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box>
					<IconButton onClick={() => {}}>
						<AttachFile />
					</IconButton>
				</Box>

				<Box sx={{ width: "100%" }}>
					<TextField
						id="standard-multiline-flexible"
						placeholder={!messageInputText ? "Write a message..." : " "}
						multiline
						maxRows={8}
						autoFocus
						onChange={onInputChange}
						value={messageInputText}
						fullWidth
						variant="standard"
					/>
				</Box>

				<Box>
					<IconButton>
						<EmojiEmotions />
					</IconButton>
				</Box>

				<Box>
					{messageInputText ? (
						<IconButton onClick={() => onAddNewMessage()}>
							<Telegram color="primary" />
						</IconButton>
					) : (
						<>
							<IconButton onClick={() => {}}>
								<MicNone />
							</IconButton>
						</>
					)}
				</Box>
			</Box>
		</Paper>
	);
};

export default MessageInput;
