import { Avatar, ListItem } from "@mui/material";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";

const ContactListItem = ({ name, lastSeen = "", onContactClick }) => {
  return (
    <ListItem
      button
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onContactClick}
    >
      <CustomBox>
        <Avatar />
      </CustomBox>
      <CustomBox col sx={{ width: "100%", ml: 1 }}>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{name}</CustomBox>
          {/* <CustomBox>clock</CustomBox> */}
        </CustomFlexBox>
        <CustomFlexBox jc="space-between" ai="center">
          <CustomBox>{lastSeen}</CustomBox>
          {/* <CustomBox>icons</CustomBox> */}
        </CustomFlexBox>
      </CustomBox>
    </ListItem>
  );
};

export default ContactListItem;
