import { useEffect, useState } from "react";

import { eventManager } from "utility-store/src/classes/EventManager";

import { actions } from "src/store/actions";

import { appOptions } from "src/classes/AppOptions";
import { apiManager } from "src/classes/api/ApiManager";
import { commonTasks } from "src/classes/CommonTasks";

import ChatBar from "src/components/rightSide/ChatBar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import GridContainer from "src/components/general/box/GridContainer";
import MessageInput from "src/components/rightSide/MessageInput";
import MessageList from "src/components/rightSide/MessageList";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";

const RightSide = () => {
  const {
    hooksOutput: { dispatch },
    // others: { getState },
    state,
  } = useMainContext();
  const [selectedUserToChat, setSelectedUserToChat] = useState({});
  const selectedUserId = state.message.selectedUserForPrivateChat.userId;

  useEffect(() => {
    const eventName = appOptions.getEventEmitterEvents().MESSAGE_SENT;
    eventManager.addListener(eventName, commonTasks.resetMessageInputText);
  }, []);

  useEffect(() => {
    const fn = async () => {
      if (!selectedUserId) return;

      const foundContact = state.user.contacts.find(
        (c) => c.userId === selectedUserId
      );

      if (foundContact) {
        setSelectedUserToChat(foundContact);
      } else {
        const response =
          await apiManager.apis.getPublicUserInfo.sendFullFeaturedRequest({
            userId: selectedUserId,
          });

        const { publicUserInfo } = response.data;

        setSelectedUserToChat(publicUserInfo);
      }
    };

    fn();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  const handleInputChange = ({ target: { value } }) => {
    dispatch(actions.messageInputOnChange({ messageInputTextValue: value }));
  };

  const handleSendMessage = async () => {
    dispatch(controllers.sendPrivateMessage());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(actions.closeRightSide());
  };

  const selectedChatMessages = state.message.privateChats.find((pc) => {
    return pc.participants.find((p) => p.participantId !== state.user.userId);
  })?.messages;

  return (
    <GridContainer
      sx={{ backgroundColor: "tomato", height: "100%" }}
      item
      lg={9}
      md={8}
    >
      {state.message.selectedUserForPrivateChat?.userId && (
        <CustomFlexBox
          col
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <CustomBox
            sx={{
              height: "50px",
              width: "100%",
            }}
          >
            <ChatBar
              onMessageContainerCloseClick={handleMessageContainerCloseClick}
              contactName={`${selectedUserToChat.firstName} ${selectedUserToChat.lastName}`}
            />
          </CustomBox>

          <CustomBox sx={{ height: "100%", width: "100%" }}>
            <MessageList
              currentUserId={state.user.userId}
              messages={selectedChatMessages || []}
            />
          </CustomBox>

          <CustomBox sx={{ width: "100%" }}>
            <MessageInput
              messageInputTextValue={state.message.messageInputTextValue}
              onSendMessage={handleSendMessage}
              onInputChange={handleInputChange}
            />
          </CustomBox>
        </CustomFlexBox>
      )}
    </GridContainer>
  );
};

export default RightSide;
