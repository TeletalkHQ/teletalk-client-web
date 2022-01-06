import { MicNone, Telegram } from "@mui/icons-material";
import { IconButton, Paper, TextField } from "@mui/material";
import { getChatsCRL } from "~/Controllers/otherControllers/getChatsCRL";

import { useMyContext } from "~/Hooks/useMyContext";
import { requester } from "~/Functions/Utils/requester";

const MessageInput = () => {
	const {
		state: {
			user: { user },
			other: { messageInputText },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleAddNewMessage = async () => {
		await requester({
			data: {
				chatID: "Xfl0OHSW-4FrHgX7fUrXHUKGr_jhIqaZApb",
				participantID: user.privateID,
				messageText: messageInputText,
			},
			method: "POST",
			url: "/chat/private/send/message",
		});
		// dispatch({ type: "INPUT_TEXT", payload: "" });
		dispatch(getChatsCRL());
	};

	const handleInputChange = ({ target: { value } }) => {
		// dispatch({ type: "INPUT_TEXT", payload: value });
	};

	return (
		<Paper elevation={9} sx={{ width: "100%" }}>
			{/* <IconButton onClick={() =>  }>
				<AttachFile />
			</IconButton> */}

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
			{/* <IconButton>
				<EmojiEmotions />
			</IconButton> */}
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
		</Paper>
	);
};

export default MessageInput;
