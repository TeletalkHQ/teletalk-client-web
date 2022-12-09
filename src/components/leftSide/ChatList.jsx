import CustomList from "src/components/general/box/CustomList";
import ChatListItem from "src/components/leftSide/ChatListItem";

const ChatList = ({
  chatList,
  onChatListItemClick,
  selectedUserForPrivateChat,
}) => {
  return (
    <>
      <CustomList
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {chatList.map((chatListItem, i) => (
          <ChatListItem
            onChatListItemClick={() => onChatListItemClick(chatListItem.userId)}
            key={i}
            message={chatListItem.message}
            name={chatListItem.name}
            selected={selectedUserForPrivateChat.userId === chatListItem.userId}
          />
        ))}
      </CustomList>
    </>
  );
};

export default ChatList;
