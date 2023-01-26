import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "src/components/general/other/Avatar";
import { Box } from "src/components/general/box";

import GreyTextParagraph from "../general/typography/GreyTextParagraph";

const ChatListItem = ({ message, name, onChatListItemClick, selected }) => {
  return (
    <Box.ListItemButton
      selected={selected}
      style={{
        display: "flex",
        height: "65px",
        borderRadius: "10px",
        justifyContent: "space-between",
      }}
      onClick={onChatListItemClick}
    >
      <ListItemAvatar>
        <Avatar style={{ width: 45, height: 45 }} />
      </ListItemAvatar>

      <Box.Flex col style={{ width: "80%" }}>
        <Upper name={name} />
        <Lower message={message} />
      </Box.Flex>
    </Box.ListItemButton>
  );
};

const Upper = ({ name }) => (
  <Box.Flex style={{ width: "100%" }} jc="space-between" ai="center">
    <Box.Div style={{ fontWeight: "500" }}>{name}</Box.Div>
    <Box.Div>
      <GreyTextParagraph style={{ fontSize: 12 }}>12:38</GreyTextParagraph>
    </Box.Div>
  </Box.Flex>
);

const Lower = ({ message }) => (
  <Box.Flex jc="space-between" style={{ width: "100%" }} ai="center">
    <GreyTextParagraph>{message}</GreyTextParagraph>
    <Box.Div>
      <PushPinTwoToneIcon fontSize="12" />
    </Box.Div>
  </Box.Flex>
);

export default ChatListItem;
