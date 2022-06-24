import {
  AttachFile,
  EmojiEmotions,
  MicNone,
  Telegram,
} from "@mui/icons-material";

import { IconButton, Paper } from "@mui/material";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

const MessageInput = ({ onInputChange, onAddNewMessage, messageInputText }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
        <CustomBox>
          <IconButton onClick={() => {}}>
            <AttachFile />
          </IconButton>
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
          <IconButton>
            <EmojiEmotions />
          </IconButton>
        </CustomBox>

        <CustomBox>
          {messageInputText ? (
            <IconButton onClick={() => onAddNewMessage()}>
              <Telegram color="primary" />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  console.log("Mic clicked");
                }}
              >
                <MicNone />
              </IconButton>
            </>
          )}
        </CustomBox>
      </CustomFlexBox>
    </Paper>
  );
};

export default MessageInput;
