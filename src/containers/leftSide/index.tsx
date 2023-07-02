import { useMemo } from "react";

import Box from "~/components/general/box";
import ChatList from "~/components/leftSide/ChatList";
import SearchBar from "~/components/leftSide/SearchBar";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import {
  LeftSidePrivateChatItem,
  MessageItem,
  PrivateChatItem,
  UserItem,
  Users,
} from "~/types";

const LeftSide = () => {
  const globalState = useGlobalStore();
  const messageState = useMessageStore();
  const userState = useUserStore();

  const chatList = useMemo(() => {
    return messageState.privateChats.map((chat) => {
      const lastMessage = getChatLastMessage(chat);
      const participantId = findParticipantId(chat, userState.userId);
      const user = findUser(globalState.users, participantId);

      return createChatListItem(lastMessage, user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageState.privateChats, globalState.users]);

  const handleDrawerIconClick = () => {
    globalState.changeDrawerOpen(true);
  };

  const handleChatClick = (chatListItem: LeftSidePrivateChatItem) => {
    messageState.selectChat(chatListItem.senderId);
  };

  return (
    <>
      <Box.Grid
        style={{
          height: "100vh",
        }}
        container
        item
        sm={12}
        md={4}
        lg={3}
      >
        <Box.Flex col style={{ width: "100%", height: "100%" }}>
          <SearchBar onDrawerIconClick={handleDrawerIconClick} />

          <Box.List
            sx={{
              overflowY: "auto",
              padding: "5px",
              scrollBehavior: "smooth",
              width: "100%",
            }}
          >
            <ChatList
              selectedChat={messageState.selectedChat}
              onChatListItemClick={handleChatClick}
              chatList={chatList}
            />
          </Box.List>
        </Box.Flex>
      </Box.Grid>
    </>
  );
};

export default LeftSide;

const findUser = (users: Users, id: string) =>
  users.find((c) => c.userId === id)!;

const findParticipantId = (chat: PrivateChatItem, userId: string) => {
  return (
    chat.participants.find(
      (participant) => participant.participantId !== userId
    )?.participantId || ""
  );
};

const getChatLastMessage = (chat: PrivateChatItem) => chat.messages.at(-1)!;

const createChatListItem = (
  lastMessage: MessageItem,
  user: UserItem
): LeftSidePrivateChatItem => {
  return {
    messageText: lastMessage.messageText,
    fullName: `${user.firstName} ${user.lastName}`,
    senderId: user.userId,
  };
};
