import ChatListItem from "~/components/leftSide/chatListItem";

const ChatList = ({ chatList, onChatListItemClick, selectedChat }) => {
  return chatList.map((item, i) => (
    <ChatListItem
      onClick={() => onChatListItemClick(item)}
      key={i}
      message={item.message}
      fullName={item.name}
      selected={selectedChat.id === item.id}
    />
  ));
};

export default ChatList;
