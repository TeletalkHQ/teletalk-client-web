import { useEffect, useState } from "react";

import { apiManager } from "classes/api/ApiManager";

import ChatList from "components/leftSide/ChatList";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import GridContainer from "components/general/box/GridContainer";
import SearchBar from "components/leftSide/SearchBar";

import { useMainContext } from "hooks/useMainContext";

import { actions } from "store/actions";
import { commonActions } from "store/commonActions";

const LeftSide = () => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const makeChatList = async () => {
      const listOfChatsWithName = [];

      for (const privateChatItem of state.message.privateChats) {
        const lastChatMessage = privateChatItem.messages.at(-1);

        const { participantId } = privateChatItem.participants.find(
          (participantItem) =>
            participantItem.participantId !== state.user.userId
        );

        const foundContact = state.user.contacts.find(
          (c) => c.userId === participantId
        );

        if (foundContact) {
          listOfChatsWithName.push({
            message: lastChatMessage.message,
            name: `${foundContact.firstName} ${foundContact.lastName}`,
            userId: foundContact.userId,
          });
        } else {
          const response =
            await apiManager.apis.getPublicUserInfo.sendFullFeaturedRequest({
              userId: participantId,
            });

          const {
            publicUserInfo: { userId, firstName, lastName },
          } = response.data;

          listOfChatsWithName.push({
            message: lastChatMessage.message,
            name: `${firstName} ${lastName}`,
            userId,
          });
        }
      }

      setChatList(listOfChatsWithName);
    };

    makeChatList();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.privateChats]);

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
