import MessageListItem from "~/components/rightSide/MessageListItem";

const MessageList = ({ messages, currentUserId }) =>
  messages.map((messageItem, index) => (
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
  ));

export default MessageList;
