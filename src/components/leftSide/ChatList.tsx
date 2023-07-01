import ChatListItem from "~/components/leftSide/chatListItem";
import {
  LeftSidePrivateChatItem as ChatListItemType,
  LeftSidePrivateChats,
  SelectedPrivateChat,
} from "~/types";

interface Props {
  chatList: LeftSidePrivateChats;
  onChatListItemClick: (c: ChatListItemType) => void;
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
