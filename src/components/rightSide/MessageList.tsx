import MessageListItem from "~/components/rightSide/MessageListItem";
import { Messages } from "~/types";

interface Props {
  currentUserId: string;
  messages: Messages;
}

const MessageList: React.FC<Props> = ({ messages, currentUserId }) => (
  <>
    {messages.map((messageItem, index: number) => {
      return (
        <MessageListItem
          key={index}
          messageTime=""
          chatDate=""
          message={messageItem.messageText}
          justify={
            currentUserId === messageItem.sender.senderId
              ? "flex-end"
              : "flex-start"
          }
          // transitionDirection={
          //   currentUserId === messageItem.sender.senderId ? "left" : "right"
          // }
        />
      );
    })}
  </>
);

export default MessageList;
