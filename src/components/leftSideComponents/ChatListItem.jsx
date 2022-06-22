import { Avatar, ListItem } from "@mui/material";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";

const ChatListItem = ({ selected, message, name, onChatListItemClick }) => {
  return (
    <ListItem
      button
      selected={selected}
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onChatListItemClick}
    >
      <CustomBox>
        <Avatar />
      </CustomBox>
      <CustomFlexBox col sx={{ width: "100%" }}>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{name}</CustomBox>
          <CustomBox>clock</CustomBox>
        </CustomFlexBox>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{message}</CustomBox>
          <CustomBox>icons</CustomBox>
        </CustomFlexBox>
      </CustomFlexBox>
    </ListItem>
  );
};

export default ChatListItem;
