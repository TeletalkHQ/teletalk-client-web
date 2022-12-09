import { useMemo } from "react";

import ChatList from "components/leftSide/ChatList";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import GridContainer from "components/general/box/GridContainer";
import SearchBar from "components/leftSide/SearchBar";

import { useMainContext } from "hooks/useMainContext";

import { actions } from "store/actions";
import { commonActions } from "store/commonActions";

const LeftSide = ({ users }) => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const chatList = useMemo(() => {
    if (!users.length) return [];
    return state.message.privateChats.map((privateChatItem) => {
      const lastChatMessage = privateChatItem.messages.at(-1);

      const { participantId } = privateChatItem.participants.find(
        (participantItem) => participantItem.participantId !== state.user.userId
      );

      const user = users.find((c) => c.userId === participantId);

      return {
        message: lastChatMessage.message,
        name: `${user.firstName} ${user.lastName}`,
        userId: user.userId,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats, users]);

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
