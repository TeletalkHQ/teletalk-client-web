import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomPaper from "components/generals/boxes/CustomPaper";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { Icons } from "components/others/Icons";

const MessageInput = ({ onInputChange, onSendMessage, messageInputText }) => {
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
            placeholder={!messageInputText ? "Write a message..." : " "}
            multiline
            maxRows={8}
            autoFocus
            onChange={onInputChange}
            value={messageInputText}
          />
        </CustomBox>

        <CustomBox>
          <CustomIconButton>
            <Icons.EmojiEmotions.Icon />
          </CustomIconButton>
        </CustomBox>

        <CustomBox>
          {messageInputText ? (
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
