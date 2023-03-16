import { useMemo } from "react";

import { arrayUtilities } from "utility-store";
import { useDispatch, useSelector } from "react-redux";

import ChatList from "src/components/leftSide/ChatList";
import { Box } from "src/components/general/box";
import SearchBar from "src/components/leftSide/SearchBar";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const LeftSide = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const chatList = useMemo(() => {
    return state.message.privateChats.map((chat) => {
      const lastMessage = getChatLastMessage(chat);
      const participantId = findParticipantId(chat, state.user.userId);
      const user = findUser(state.global.users, participantId);

      return createChatListItem(lastMessage, user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats, state.global.users]);

  const handleDrawerIconClick = () => {
    dispatch(commonActions.openAppDrawer());
  };

  const handleChatClick = (chatListItem) => {
    dispatch(
      actions.selectedChat({
        id: chatListItem.userId,
        type: "private",
      })
    );
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
              selectedChat={state.message.selectedChat}
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

const findUser = (users, id) => {
  return users.find((c) => c.userId === id);
};
const findParticipantId = (chat, userId) => {
  return chat.participants.find(
    (participant) => participant.participantId !== userId
  ).participantId;
};

const getChatLastMessage = (chat) => arrayUtilities.lastItem(chat.messages);

const createChatListItem = (lastMessage, user) => {
  return {
    //TODO: rename .message to .text (server side too)
    message: lastMessage.message,
    name: `${user.firstName} ${user.lastName}`,
    userId: user.userId,
  };
};
