import MessageListItem from "~/Components/MessageContainer/MessageListItem";

const MessageList = ({ messages, user }) => {
	const listOfMessages = messages.map((message, index) => {
		return (
			<MessageListItem
				key={index}
				message={message.text}
				justify={user.privateID === message.senderID ? "flex-end" : "flex-start"}
				direction={user.privateID === message.senderID ? "right" : "left"}
			/>
		);
	});

	return <>{listOfMessages}</>;
};

export default MessageList;
