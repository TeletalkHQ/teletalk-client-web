import { AttachFile, EmojiEmotions, MicNone, Telegram } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import { getChatsCRL } from "~/Controllers/otherControllers/getChatsCRL";

import { useMyContext } from "~/Hooks/useMyContext";

const MessageInput = () => {
	const {
		state: {
			temp: { messageInputText },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleAddNewMessage = async () => {
		dispatch(getChatsCRL());
	};

	const handleInputChange = ({ target: { value } }) => {
		// dispatch({ type: "INPUT_TEXT", payload: value });
	};

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
						// onChange={handleInputChange}
						// value={messageInputText}
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
						<IconButton onClick={() => handleAddNewMessage()}>
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
