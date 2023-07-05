import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import IconButton from "~/components/general/other/IconButton";
import { Icons } from "~/components/other/Icons";
import { useMessageStore } from "~/store";
import { CommonChangeEvent, SendPrivateMessageIO } from "~/types";

interface Props {}

const MessageInput: React.FC<Props> = () => {
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

  return (
    <Box.Paper style={{ borderRadius: 0 }}>
      <Box.Flex gap={1} style={{ padding: 5 }} jc="space-between" ai="center">
        <Box.Div>
          <IconButton onClick={() => {}}>
            <Icons.AttachFile.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div style={{ width: "100%" }}>
          <Input.Text
            placeholder={
              !messageStore.messageInputTextValue ? "Message..." : " "
            }
            multiline
            maxRows={8}
            autoFocus
            onChange={handleInputChange}
            value={messageStore.messageInputTextValue}
          />
        </Box.Div>

        <Box.Div>
          <IconButton>
            <Icons.EmojiEmotions.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div>
          {messageStore.messageInputTextValue ? (
            <IconButton onClick={handleSendMessage}>
              <Icons.Telegram.Icon color="primary" />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  console.debug("Mic clicked");
                }}
              >
                <Icons.MicNone.Icon />
              </IconButton>
            </>
          )}
        </Box.Div>
      </Box.Flex>
    </Box.Paper>
  );
};

export default MessageInput;