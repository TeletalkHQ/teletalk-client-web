import ChatListItem from "~/components/leftSide/chatListItem";
import { ChatListItem as ChatListItemType, Chats, SelectedChat } from "~/types";

interface Props {
  chatList: Chats;
  onChatListItemClick: (c: ChatListItemType) => void;
  selectedChat: SelectedChat;
}

const ChatList: React.FC<Props> = ({
  chatList,
  onChatListItemClick,
  selectedChat,
}) => {
  return chatList.map((item, i) => (
    <ChatListItem
      onClick={() => onChatListItemClick(item)}
      key={i}
      message={item.messageText}
      fullName={item.name}
      selected={selectedChat.id === item.userId}
    />
  ));
};

export default ChatList;
