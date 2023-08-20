import ListItemAvatar from "@mui/material/ListItemAvatar";

import { userUtils } from "~/classes/UserUtils";
import { Box } from "~/components";
import { useUserPublicData } from "~/hooks";
import { MessageText, UserId, VoidNoArgsFn } from "~/types";

import Lower from "./Lower";
import Upper from "./Upper";

interface Props {
  messageText: MessageText;
  onClick: VoidNoArgsFn;
  selected: boolean;
  userId: UserId;
}

const ChatListItem: React.FC<Props> = ({
  messageText,
  onClick,
  selected,
  userId,
}) => {
  const { publicData } = useUserPublicData(userId);

  const fullName = userUtils.concatFirstNameWithLastName(publicData);

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
        <Box.Avatar style={{ width: 45, height: 45 }} />
      </ListItemAvatar>

      <Box.Flex col style={{ width: "80%" }}>
        <Upper fullName={fullName} />
        <Lower messageText={messageText} />
      </Box.Flex>
    </Box.ListItemButton>
  );
};

export default ChatListItem;
