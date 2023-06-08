import MessageListItem from "~/components/rightSide/MessageListItem";

interface Props {
  currentUserId: string;
}

const MessageList: React.FC<Props> = ({ messages, currentUserId }) =>
  messages.map((messageItem, index: number) => {
    return (
      <>
        {
          <MessageListItem
            key={index}
            messageTime=""
            chatDate=""
            message={messageItem.message}
            justify={
              currentUserId === messageItem.sender.senderId
                ? "flex-end"
                : "flex-start"
            }
            // transitionDirection={
            //   currentUserId === messageItem.sender.senderId ? "left" : "right"
            // }
          />
        }
      </>
    );
  });

export default MessageList;
