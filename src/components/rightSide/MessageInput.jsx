import CustomBox from "components/general/box/CustomBox";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import CustomIconButton from "components/general/other/CustomIconButton";
import CustomPaper from "components/general/box/CustomPaper";
import CustomTextInput from "components/general/input/CustomTextInput";
import { Icons } from "components/other/Icons";

const MessageInput = ({
  messageInputTextValue,
  onInputChange,
  onSendMessage,
}) => {
  return (
    <CustomPaper sx={{ width: "100%" }}>
      <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
        <CustomBox>
          <CustomIconButton onClick={() => {}}>
            <Icons.AttachFile.Icon />
          </CustomIconButton>
        </CustomBox>

        <CustomBox sx={{ width: "100%" }}>
          <CustomTextInput
            id="standard-multiline-flexible"
            placeholder={!messageInputTextValue ? "Write a message..." : " "}
            multiline
            maxRows={8}
            autoFocus
            onChange={onInputChange}
            value={messageInputTextValue}
          />
        </CustomBox>

        <CustomBox>
          <CustomIconButton>
            <Icons.EmojiEmotions.Icon />
          </CustomIconButton>
        </CustomBox>

        <CustomBox>
          {messageInputTextValue ? (
            <CustomIconButton onClick={() => onSendMessage()}>
              <Icons.Telegram.Icon color="primary" />
            </CustomIconButton>
          ) : (
            <>
              <CustomIconButton
                onClick={() => {
                  logger.debug("Mic clicked");
                }}
              >
                <Icons.MicNone.Icon />
              </CustomIconButton>
            </>
          )}
        </CustomBox>
      </CustomFlexBox>
    </CustomPaper>
  );
};

export default MessageInput;
