import Box from "~/components/general/box";

import IconButton from "~/components/general/other/IconButton";
import { Input } from "~/components/general/input";
import { Icons } from "~/components/other/Icons";

const MessageInput = ({
  messageInputTextValue,
  onInputChange,
  onSendMessage,
}) => {
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
            placeholder={!messageInputTextValue ? "Message..." : " "}
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
            <IconButton onClick={onSendMessage}>
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
