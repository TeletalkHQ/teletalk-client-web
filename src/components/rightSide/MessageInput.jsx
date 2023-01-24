import { Box } from "src/components/general/box";
import IconButton from "src/components/general/other/IconButton";
import { Input } from "src/components/general/input";
import { Icons } from "src/components/other/Icons";

const MessageInput = ({
  messageInputTextValue,
  onInputChange,
  onSendMessage,
}) => {
  return (
    <Box.Paper sx={{ width: "100%" }}>
      <Box.Flex sx={{ width: "100%" }} jc="space-between" ai="center">
        <Box.Div>
          <IconButton onClick={() => {}}>
            <Icons.AttachFile.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div style={{ width: "100%" }}>
          <Input.Text
            placeholder={!messageInputTextValue ? "Write a message..." : " "}
            multiline
            maxRows={8}
            autoFocus
            onChange={onInputChange}
            value={messageInputTextValue}
          />
        </Box.Div>

        <Box.Div>
          <IconButton>
            <Icons.EmojiEmotions.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div>
          {messageInputTextValue ? (
            <IconButton onClick={() => onSendMessage()}>
              <Icons.Telegram.Icon color="primary" />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  logger.debug("Mic clicked");
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
