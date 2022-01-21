import MessageListItem from "~/Components/MessageContainer/MessageListItem";

const MessageList = ({ messages, user }) => {
	console.log(messages);

	const listOfMessages = messages.map((messageItem, index) => {
		return (
			<MessageListItem
				key={index}
				message={messageItem.message}
				justify={
					user.privateID === messageItem.messageSender.senderID ? "flex-end" : "flex-start"
				}
				direction={user.privateID === messageItem.messageSender.senderID ? "left" : "right"}
			/>
		);
	});

	return <>{listOfMessages}</>;
};

export default MessageList;
