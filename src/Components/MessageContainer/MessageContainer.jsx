import { Box } from "@mui/material";
import MessageList from "~/Components/MessageContainer/MessageList";

import { useMyContext } from "~/Hooks/useMyContext";
import ChatBar from "./ChatBar";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
	const {
		state: {
			temp,
			temp: {
				contact: { firstName, lastName },
			},
			user,
		},
	} = useMyContext();

	return (
		<Box
			flexDirection="column"
			sx={{ width: "100%", height: "100%" }}
			justifyContent="space-between"
			alignItems="center"
			display="flex"
		>
			<Box sx={{ height: "50px", width: "100%" }}>
				<ChatBar chatName={`${firstName} ${lastName}`} />
			</Box>

			<Box sx={{ height: "100%", width: "100%" }}>
				<MessageList messages={temp.messages} user={user} />
			</Box>

			<Box sx={{ width: "100%" }}>
				<MessageInput />
			</Box>
		</Box>
	);
};

export default MessageContainer;

// const { override, addBabelPlugin } = require("customize-cra");

// module.exports = override(addBabelPlugin("react-activation/babel"));
