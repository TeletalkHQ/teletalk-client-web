import { Box, Button, Icon, Input, Progress } from "~/components";
import { useEmitter } from "~/hooks";
import { useMessageStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const MessageInput = () => {
  const messageStore = useMessageStore();
  const { handler, loading } = useEmitter("sendMessage");

  const handleInputChange = (event: CommonChangeEvent) => {
    messageStore.messageInputOnChange(event.target.value);
  };

  const handleSendMessage = () => {
    handler.emitFull(
      {
        messageText: messageStore.messageInputTextValue,
        targetParticipantId: messageStore.selectedChatInfo.userId,
      },
      () => {
        messageStore.messageInputOnChange("");
      }
    );
  };

  return (
    <Box.Paper style={{ borderRadius: 0 }}>
      <Box.Flex gap={1} style={{ padding: 5 }} jc="space-between" ai="center">
        <Box.Div>
          <Button.Icon onClick={() => {}}>
            <Icon.AttachFile.Element />
          </Button.Icon>
        </Box.Div>

        <Box.Div style={{ width: "100%" }}>
          <Input.Base.Text
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
          <Button.Icon>
            <Icon.EmojiEmotions.Element />
          </Button.Icon>
        </Box.Div>

        <Box.Div>
          {messageStore.messageInputTextValue ? (
            <Button.Icon onClick={() => !loading && handleSendMessage()}>
              {loading ? (
                <Progress.Circular />
              ) : (
                <Icon.Send.Element color="primary" />
              )}
            </Button.Icon>
          ) : (
            <>
              <Button.Icon
                onClick={() => {
                  console.debug("Mic clicked");
                }}
              >
                <Icon.MicNone.Element />
              </Button.Icon>
            </>
          )}
        </Box.Div>
      </Box.Flex>
    </Box.Paper>
  );
};

export default MessageInput;
