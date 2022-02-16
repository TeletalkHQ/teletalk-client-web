import MessageListItem from "~/Components/RightSideComponents/MessageListItem";

const MessageList = ({ messages, user }) => {
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
