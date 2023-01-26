import ChatListItem from "src/components/leftSide/ChatListItem";

const ChatList = ({
  chatList,
  onChatListItemClick,
  selectedUserForPrivateChat,
}) => {
  return chatList.map((chatListItem, i) => (
    <ChatListItem
      onChatListItemClick={() => onChatListItemClick(chatListItem.userId)}
      key={i}
      message={chatListItem.message}
      name={chatListItem.name}
      selected={selectedUserForPrivateChat.userId === chatListItem.userId}
    />
  ));
};

export default ChatList;
