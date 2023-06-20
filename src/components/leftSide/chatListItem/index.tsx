import ListItemAvatar from "@mui/material/ListItemAvatar";

import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import { VoidNoArgsFn } from "~/types";

import Lower from "./Lower";
import Upper from "./Upper";

interface Props {
  message: string;
  fullName: string;
  onClick: VoidNoArgsFn;
  selected: boolean;
}

const ChatListItem: React.FC<Props> = ({
  message,
  fullName,
  onClick,
  selected,
}) => {
  return (
    <Box.ListItemButton
      selected={selected}
      style={{
        borderRadius: "10px",
        display: "flex",
        height: "65px",
        justifyContent: "space-between",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar style={{ width: 45, height: 45 }} />
      </ListItemAvatar>

      <Box.Flex col style={{ width: "80%" }}>
        <Upper fullName={fullName} />
        <Lower message={message} />
      </Box.Flex>
    </Box.ListItemButton>
  );
};

export default ChatListItem;
