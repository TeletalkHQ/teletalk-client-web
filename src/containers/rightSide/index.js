import { useEffect, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { eventManager } from "src/classes/EventManager";

import ChatBar from "src/components/rightSide/ChatBar";
import { Box } from "src/components/general/box";
import MessageInput from "src/components/rightSide/MessageInput";
import MessageList from "src/components/rightSide/MessageList";

import { controllers } from "src/controllers";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

const RightSide = ({ participants }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const oldMessages = useRef([]);

  const selectedUserId = state.message.selectedUserForPrivateChat.userId;

  const selectedChatMessages = useMemo(
    () =>
      state.message.privateChats.find((pc) => {
        return pc.participants.find((p) => p.participantId === selectedUserId);
      })?.messages || [],
    [selectedUserId, state.message.privateChats]
  );

  useEffect(() => {
    if (oldMessages.current.length < selectedChatMessages.length) {
      const messageBox = domUtilities().getElementById("messageBox");
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
      });
    }

    oldMessages.current = selectedChatMessages;
  }, [selectedChatMessages]);

  useEffect(() => {
    const eventName = eventManager.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
    eventManager.addListener(eventName, () => {
      dispatch(actions.messageInputOnChange({ messageInputTextValue: "" }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedParticipantToChat = participants.find(
    (p) => p.participantId === selectedUserId
  );

  const handleInputChange = ({ target: { value } }) => {
    dispatch(actions.messageInputOnChange({ messageInputTextValue: value }));
  };

  const handleSendMessage = async () => {
    dispatch(controllers.sendPrivateMessage());
  };

  const handleMessageContainerCloseClick = () => {
    dispatch(actions.closeRightSide());
  };

  const handleChatBarClick = () => {
    dispatch(commonActions.openDialog(stateStatics.DIALOG_NAMES.USER_INFO));
  };

  return (
    <Box.Grid
      container
      sx={{ backgroundColor: "lightgray", height: "100%" }}
      item
      lg={9}
      md={8}
    >
      {selectedUserId && (
        <Box.Flex
          col
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <Box.Div
            style={{
              width: "100%",
            }}
          >
            <ChatBar
              onChatBarClick={handleChatBarClick}
              onMessageContainerCloseClick={handleMessageContainerCloseClick}
              contactName={`${selectedParticipantToChat.firstName} ${selectedParticipantToChat.lastName}`}
            />
          </Box.Div>

          <Box.Div
            id="messageBox"
            style={{
              width: "100%",
              overflowY: "auto",
              height: "100%",
              padding: 5,
              scrollBehavior: "smooth",
            }}
          >
            <MessageList
              currentUserId={state.user.userId}
              messages={selectedChatMessages}
            />
          </Box.Div>

          <Box.Div style={{ width: "100%" }}>
            <MessageInput
              messageInputTextValue={state.message.messageInputTextValue}
              onSendMessage={handleSendMessage}
              onInputChange={handleInputChange}
            />
          </Box.Div>
        </Box.Flex>
      )}
    </Box.Grid>
  );
};

export default RightSide;
