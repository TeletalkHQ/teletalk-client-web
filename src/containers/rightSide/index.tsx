import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Box from "~/components/general/box";
import ChatBar from "~/components/rightSide/ChatBar";
import MessageInput from "~/components/rightSide/MessageInput";
import MessageList from "~/components/rightSide/MessageList";
import { useGlobalStore, useMessageStore } from "~/store";
import { CommonChangeEvent, SendPrivateMessageIO } from "~/types";

const RightSide = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();

  const handleInputChange = (event: CommonChangeEvent) => {
    messageStore.messageInputOnChange(event.target.value);
  };

  const handleSendMessage = async () => {
    socketEmitterStore.events.sendPrivateMessage.emitFull<SendPrivateMessageIO>(
      {
        messageText: messageStore.messageInputTextValue,
        participantId: messageStore.selectedChatInfo.userId,
      },
      async ({ data }) => {
        messageStore.messageInputOnChange("");
        return data;
      }
    );
  };

  const handleMessageContainerCloseClick = () => {
    messageStore.deselectChat();
  };

  const handleChatBarClick = () => {
    globalStore.openDialog("userInfo");
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
      {messageStore.selectedChatInfo.userId && (
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
            />
          </Box.Div>

          <MessageList />

          <Box.Div
            style={{
              width: "100%",
            }}
          >
            <MessageInput
              messageInputTextValue={messageStore.messageInputTextValue}
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
