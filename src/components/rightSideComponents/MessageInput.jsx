import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomPaper from "components/generals/boxes/CustomPaper";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { appIcons } from "variables/initials/initialValues/appIcons";

const MessageInput = ({ onInputChange, onAddNewMessage, messageInputText }) => {
  return (
    <CustomPaper sx={{ width: "100%" }}>
      <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
        <CustomBox>
          <CustomIconButton onClick={() => {}}>
            <appIcons.attachFile.Icon />
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
            <appIcons.emojiEmotions.Icon />
          </CustomIconButton>
        </CustomBox>

        <CustomBox>
          {messageInputText ? (
            <CustomIconButton onClick={() => onAddNewMessage()}>
              <appIcons.telegram.Icon color="primary" />
            </CustomIconButton>
          ) : (
            <>
              <CustomIconButton
                onClick={() => {
                  console.log("Mic clicked");
                }}
              >
                <appIcons.micNone.Icon />
              </CustomIconButton>
            </>
          )}
        </CustomBox>
      </CustomFlexBox>
    </CustomPaper>
  );
};

export default MessageInput;
