import { Paper, Slide } from "@mui/material";

import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTypography from "components/generals/typographies/CustomTypography";

const MessageListItem = ({
  chatDate,
  direction,
  justify,
  message,
  messageItemClassName,
  messageTime,
}) => {
  return (
    <>
      <CustomFlexBox
        sx={{ width: "100%", padding: "3px" }}
        justifyContent={justify}
      >
        <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
          <Paper
            sx={{ padding: "3px" }}
            className={`${messageItemClassName}`}
            elevation={1}
            // onContextMenu={(e) => onOtherStateChange(e)}
          >
            <CustomTypography style={{ wordBreak: "break-word" }}>
              {message}
            </CustomTypography>
            <CustomTypography style={{ fontSize: "13px", float: "right" }}>
              {messageTime} {chatDate}
            </CustomTypography>
          </Paper>
        </Slide>
      </CustomFlexBox>
    </>
  );
};

export default MessageListItem;
