import MessageListItem from "components/rightSideComponents/MessageListItem";

const MessageList = ({ messages, user }) => {
  const listOfMessages = messages.map((messageItem, index) => {
    return (
      <MessageListItem
        key={index}
        message={messageItem.message}
        justify={
          user.privateId === messageItem.messageSender.senderId
            ? "flex-end"
            : "flex-start"
        }
        direction={
          user.privateId === messageItem.messageSender.senderId
            ? "left"
            : "right"
        }
      />
    );
  });

  return <>{listOfMessages}</>;
};

export default MessageList;
