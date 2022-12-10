import { useEffect } from "react";

import { eventManager } from "utility-store/src/classes/EventManager";

import { actions } from "src/store/actions";

import { appOptions } from "src/classes/AppOptions";
import { commonTasks } from "src/classes/CommonTasks";

import ChatBar from "src/components/rightSide/ChatBar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import GridContainer from "src/components/general/box/GridContainer";
import MessageInput from "src/components/rightSide/MessageInput";
import MessageList from "src/components/rightSide/MessageList";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

const RightSide = ({ participants }) => {
  const dispatch = useDispatch();
  const state = useSelector();

  useEffect(() => {
    const eventName = appOptions.getEventEmitterEvents().MESSAGE_SENT;
    eventManager.addListener(eventName, commonTasks.resetMessageInputText);
  }, []);

  const selectedUserId = state.message.selectedUserForPrivateChat.userId;

  const selectedParticipantToChat = participants.find(
    (p) => p.participantId === selectedUserId
  );

  const selectedChatMessages = state.message.privateChats.find((pc) => {
    return pc.participants.find((p) => p.participantId === selectedUserId);
  })?.messages;

  const handleInputChange = ({ target: { value } }) => {
    dispatch(actions.messageInputOnChange({ messageInputTextValue: value }));
  };

  const handleSendMessage = async () => {
    dispatch(controllers.sendPrivateMessage());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(actions.closeRightSide());
  };

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
              contactName={`${selectedParticipantToChat.firstName} ${selectedParticipantToChat.lastName}`}
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
