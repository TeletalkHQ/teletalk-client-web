import { useMemo } from "react";

import ChatList from "src/components/leftSide/ChatList";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import GridContainer from "src/components/general/box/GridContainer";
import SearchBar from "src/components/leftSide/SearchBar";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

const LeftSide = ({ participants }) => {
  const dispatch = useDispatch();
  const state = useSelector();

  const chatList = useMemo(() => {
    if (!participants.length) return [];

    return state.message.privateChats.map((privateChatItem) => {
      const chatLastMessage = getChatLastMessage(privateChatItem);
      const participantId = findParticipantId(
        privateChatItem,
        state.user.userId
      );
      const participant = findParticipant(participants, participantId);

      return createChatListItem(chatLastMessage, participant);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats, participants]);

  const handleDrawerIconClick = () => {
    dispatch(commonActions.openAppDrawer());
  };

  const handleChatListItemClick = (userId) => {
    dispatch(
      actions.selectedUserForPrivateChat({
        userId,
      })
    );
  };

  return (
    <>
      <GridContainer
        sx={{ backgroundColor: "lightcyan" }}
        item
        sm={12}
        md={4}
        lg={3}
      >
        <CustomFlexBox col style={{ width: "100%", height: "100%" }}>
          <CustomFlexBox jc="space-between" ai="center">
            <SearchBar onDrawerIconClick={handleDrawerIconClick} />
          </CustomFlexBox>
          <CustomFlexBox sx={{ width: "100%", height: "100%" }}>
            {/* <SideBarList /> */}
            <ChatList
              selectedUserForPrivateChat={
                state.message.selectedUserForPrivateChat
              }
              onChatListItemClick={handleChatListItemClick}
              chatList={chatList}
            />
          </CustomFlexBox>
        </CustomFlexBox>
      </GridContainer>
    </>
  );
};

export default LeftSide;

const findParticipant = (participants, participantId) => {
  return participants.find((c) => c.userId === participantId);
};
const findParticipantId = (privateChatItem, userId) => {
  return privateChatItem.participants.find(
    (participantItem) => participantItem.participantId !== userId
  ).participantId;
};

const getChatLastMessage = (privateChatItem) =>
  arrayUtilities.lastItem(privateChatItem.messages);

const createChatListItem = (chatLastMessage, participant) => {
  return {
    message: chatLastMessage.message,
    name: `${participant.firstName} ${participant.lastName}`,
    userId: participant.userId,
  };
};
