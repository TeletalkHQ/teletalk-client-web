import { useEffect } from "react";

import Box from "~/components/general/box";
import MessageInput from "~/components/messenger/rightSide/MessageInput";
import MessageList from "~/components/messenger/rightSide/MessageList";
import ChatBar from "~/components/messenger/rightSide/chatBar";
import {
  useEmitter,
  useNewPrivateChatMessage,
  useSetPrivateChats,
} from "~/hooks";
import { useMessageStore } from "~/store";

const RightSide = () => {
  const messageStore = useMessageStore();
  useNewPrivateChatMessage();
  useSetPrivateChats();
  const { handler } = useEmitter("joinRoom");

  useEffect(() => {
    handler.emit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box.Grid
      container
      sx={{
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
