import ListItemAvatar from "@mui/material/ListItemAvatar";

import { userUtils } from "~/classes/UserUtils";
import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import { useGetPublicUserData } from "~/hooks";
import { MessageText, UserId, VoidNoArgsFn } from "~/types";

import Lower from "./Lower";
import Upper from "./Upper";

interface Props {
  messageText: MessageText;
  userId: UserId;
  onClick: VoidNoArgsFn;
  selected: boolean;
}

const ChatListItem: React.FC<Props> = ({
  messageText,
  onClick,
  selected,
  userId,
}) => {
  const publicUserData = useGetPublicUserData(userId);
  const fullName = userUtils.concatFirstNameWithLastName(publicUserData);

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
        <Lower messageText={messageText} />
      </Box.Flex>
    </Box.ListItemButton>
  );
};

export default ChatListItem;
