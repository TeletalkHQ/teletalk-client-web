import MessageListItem from "src/components/rightSide/MessageListItem";

const MessageList = ({ messages, currentUserId }) => {
  const listOfMessages = messages.map((messageItem, index) => {
    return (
      <MessageListItem
        key={index}
        message={messageItem.message}
        justify={
          currentUserId === messageItem.sender.senderId
            ? "flex-end"
            : "flex-start"
        }
        direction={
          currentUserId === messageItem.sender.senderId ? "left" : "right"
        }
      />
    );
  });

  return <>{listOfMessages}</>;
};

export default MessageList;
