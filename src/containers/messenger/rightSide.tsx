import { useEffect } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Box from "~/components/general/box";
import ChatBar from "~/components/messenger/rightSide/ChatBar";
import MessageInput from "~/components/messenger/rightSide/MessageInput";
import MessageList from "~/components/messenger/rightSide/MessageList";
import { useNewPrivateChatMessage } from "~/hooks/useNewPrivateChatMessage";
import { useSetPrivateChats } from "~/hooks/useSetPrivateChats";
import { useMessageStore } from "~/store";

const RightSide = () => {
  const messageStore = useMessageStore();
  useNewPrivateChatMessage();
  useSetPrivateChats();

  useEffect(() => {
    socketEmitterStore.events.joinRoom.emit();
  }, []);

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
            <ChatBar />
          </Box.Div>

          <MessageList />

          <Box.Div
            style={{
              width: "100%",
            }}
          >
            <MessageInput />
          </Box.Div>
        </Box.Flex>
      )}
    </Box.Grid>
  );
};

export default RightSide;