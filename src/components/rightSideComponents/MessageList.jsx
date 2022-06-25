import MessageListItem from "components/rightSideComponents/MessageListItem";

const MessageList = ({ messages, user }) => {
  const listOfMessages = messages.map((messageItem, index) => {
    return (
      <MessageListItem
        key={index}
        message={messageItem.message}
        justify={
          user.privateId === messageItem.messageSender.senderID
            ? "flex-end"
            : "flex-start"
        }
        direction={
          user.privateId === messageItem.messageSender.senderID
            ? "left"
            : "right"
        }
      />
    );
  });

  return <>{listOfMessages}</>;
};

export default MessageList;
