import { Close, MoreVert } from "@mui/icons-material";
import { IconButton, Paper, Avatar } from "@mui/material";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTypography from "components/generals/typographies/CustomTypography";

const ChatBar = ({ chatName, onMessageContainerCloseClick }) => {
  return (
    <>
      <Paper sx={{ width: "100%", height: "100%" }}>
        <CustomFlexBox
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <CustomBox>
            <IconButton onClick={onMessageContainerCloseClick}>
              <Close />
            </IconButton>
          </CustomBox>
          <CustomFlexBox ai="center">
            <Avatar alt={chatName} />
            <CustomTypography>{chatName}</CustomTypography>
          </CustomFlexBox>
          <CustomBox>
            <IconButton>
              <MoreVert />
            </IconButton>
          </CustomBox>
        </CustomFlexBox>
      </Paper>
    </>
  );
};

export default ChatBar;
