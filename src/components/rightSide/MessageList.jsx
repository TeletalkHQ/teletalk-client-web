import MessageListItem from "components/rightSide/MessageListItem";

const MessageList = ({ messages, user }) => {
  const listOfMessages = messages.map((messageItem, index) => {
    return (
      <MessageListItem
        key={index}
        message={messageItem.message}
        justify={
          user.userId === messageItem.messageSender.senderId
            ? "flex-end"
            : "flex-start"
        }
        direction={
          user.userId === messageItem.messageSender.senderId ? "left" : "right"
        }
      />
    );
  });

  return <>{listOfMessages}</>;
};

export default MessageList;
