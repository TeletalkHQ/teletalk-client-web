import { AttachFile, EmojiEmotions, MicNone, Telegram } from "@mui/icons-material";
import { IconButton, Paper, TextField } from "@mui/material";

import { useMyContext } from "~/Functions/Hooks/useMyContext";
import { requester } from "~/Functions/Utils/requester";

const MessageInput = () => {
	const {
		state: {
			auth: { user },
			global: { messageInputText },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleAddNewMessage = async () => {
		requester({
			data: { chatID: "", participantID: user.privateID, messageText: messageInputText },
		});
	};

	const handleInputChange = ({ target: { value } }) => {
		dispatch({ type: "inputText", payload: value });
	};

	return (
		<Paper elevation={9} sx={{ width: "100%" }}>
			<IconButton onClick={() => console.log("Pin Clicked")}>
				<AttachFile />
			</IconButton>

			<TextField
				id="standard-multiline-flexible"
				label={!messageInputText ? "Write a message..." : " "}
				multiline
				maxRows={8}
				autoFocus
				onChange={handleInputChange}
				value={messageInputText}
				className="textarea"
				sx={{ width: "55%" }}
			/>
			<IconButton>
				<EmojiEmotions />
			</IconButton>
			{messageInputText ? (
				<IconButton onClick={() => handleAddNewMessage()}>
					<Telegram color="primary" />
				</IconButton>
			) : (
				<>
					<IconButton onClick={() => console.log("Mic Clicked")}>
						<MicNone />
					</IconButton>
				</>
			)}
		</Paper>
	);
};

export default MessageInput;
