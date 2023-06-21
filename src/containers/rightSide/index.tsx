import { useEffect, useMemo, useRef } from "react";

import { domUtils } from "~/classes/DomUtils";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Box from "~/components/general/box";
import ChatBar from "~/components/rightSide/ChatBar";
import MessageInput from "~/components/rightSide/MessageInput";
import MessageList from "~/components/rightSide/MessageList";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { CommonChangeEvent, Messages } from "~/types";

const RightSide = () => {
  const globalState = useGlobalStore();
  const messageState = useMessageStore();
  const userState = useUserStore();

  const oldMessages = useRef<Messages>([]);

  const selectedChatMessages = useMemo(() => {
    return (
      messageState.privateChats.find((pc) => {
        return pc.participants.find(
          (p) => p.participantId === messageState.selectedChat.id
        );
      })?.messages || []
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageState.selectedChat.id, messageState.privateChats]);

  useEffect(() => {
    if (oldMessages.current.length < selectedChatMessages.length) {
      const messageBox = domUtils().getElementById("messageBox")!;
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
      });
    }

    oldMessages.current = selectedChatMessages;
  }, [selectedChatMessages]);

  const selectedParticipantToChat = globalState.users.find(
    (p) => p.userId === messageState.selectedChat.id
  )!;

  const handleInputChange = (event: CommonChangeEvent) => {
    messageState.messageInputOnChange(event.target.value);
  };

  const handleSendMessage = async () => {
    socketEmitterStore.events.sendPrivateMessage.emitFull(
      {
        message: messageState.messageInputTextValue,
        participantId: messageState.selectedChat.id,
      },
      async () => {
        messageState.messageInputOnChange("");
      }
    );
  };

  const handleMessageContainerCloseClick = () => {
    messageState.deselectChat();
  };

  const handleChatBarClick = () => {
    globalState.openDialog("userInfo");
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
      {messageState.selectedChat.id && (
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
              currentUserId={userState.userId}
              messages={selectedChatMessages}
            />
          </Box.Div>

          <Box.Div
            style={{
              width: "100%",
            }}
          >
            <MessageInput
              messageInputTextValue={messageState.messageInputTextValue}
              onSendMessage={handleSendMessage}
              onChange={handleInputChange}
            />
          </Box.Div>
        </Box.Flex>
      )}
    </Box.Grid>
  );
};

export default RightSide;
