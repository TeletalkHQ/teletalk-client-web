import ChatListItem from "~/components/leftSide/chatListItem";
import {
  LeftSidePrivateChatItem,
  LeftSidePrivateChats,
  SelectedPrivateChat,
} from "~/types";

interface Props {
  chatList: LeftSidePrivateChats;
  onChatListItemClick: (c: LeftSidePrivateChatItem) => void;
  selectedChat: SelectedPrivateChat;
}

const ChatList: React.FC<Props> = ({
  chatList,
  onChatListItemClick,
  selectedChat,
}) => (
  <>
    {chatList.map((item, i) => (
      <ChatListItem
        onClick={() => onChatListItemClick(item)}
        key={i}
        message={item.messageText}
        fullName={item.fullName}
        selected={selectedChat.chatId === item.senderId}
      />
    ))}
  </>
);

export default ChatList;
