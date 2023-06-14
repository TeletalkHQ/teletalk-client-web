import { useEffect, useMemo, useRef } from "react";

import { domUtils } from "~/classes/DomUtils";

import ChatBar from "~/components/rightSide/ChatBar";
import Box from "~/components/general/box";

import MessageInput from "~/components/rightSide/MessageInput";
import MessageList from "~/components/rightSide/MessageList";

import { controllers } from "~/controllers";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

const RightSide = () => {
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
      const messageBox = domUtils().getElementById("messageBox");
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
      });
    }

    oldMessages.current = selectedChatMessages;
  }, [selectedChatMessages]);

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
