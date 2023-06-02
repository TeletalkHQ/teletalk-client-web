import ChatListItem from "~/components/leftSide/ChatListItem";

const ChatList = ({ chatList, onChatListItemClick, selectedChat }) => {
  return chatList.map((item, i) => (
    <ChatListItem
      onChatListItemClick={() => onChatListItemClick(item)}
      key={i}
      message={item.message}
      name={item.name}
      selected={selectedChat.id === item.id}
    />
  ));
};

export default ChatList;
