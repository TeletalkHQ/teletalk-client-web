import { useEffect, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { eventEmitter } from "src/classes/EventEmitter";

import ChatBar from "src/components/rightSide/ChatBar";
import { Box } from "src/components/general/box";
import MessageInput from "src/components/rightSide/MessageInput";
import MessageList from "src/components/rightSide/MessageList";

import { controllers } from "src/controllers";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

const RightSide = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const oldMessages = useRef([]);

  const selectedChatMessages = useMemo(() => {
    if (state.message.selectedChat.type === "private") {
      return (
        state.message.privateChats.find((pc) => {
          return pc.participants.find(
            (p) => p.participantId === state.message.selectedChat.id
          );
        })?.messages || []
      );
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.message.selectedChat.id, state.message.privateChats]);

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
    const eventName = eventEmitter.EVENT_EMITTER_EVENTS.MESSAGE_SENT;
    eventEmitter.addListener(eventName, () => {
      dispatch(actions.messageInputOnChange({ messageInputTextValue: "" }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedParticipantToChat = state.global.users.find(
    (p) => p.userId === state.message.selectedChat.id
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
      sx={{
        backgroundColor: "lightgray",
        height: "100%",
      }}
      item
      lg={9}
      md={8}
    >
      {state.message.selectedChat.id && (
        <Box.Flex
          col
          sx={{
            height: "100%",
            width: "100%",
          }}
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
              height: "100%",
              overflowY: "auto",
              padding: 5,
              scrollBehavior: "smooth",
              width: "100%",
            }}
          >
            <MessageList
              currentUserId={state.user.userId}
              messages={selectedChatMessages}
            />
          </Box.Div>

          <Box.Div
            style={{
              width: "100%",
            }}
          >
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
