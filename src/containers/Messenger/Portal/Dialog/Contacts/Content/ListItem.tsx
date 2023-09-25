import { UserId } from "teletalk-type-store";

import { Box, Typography } from "~/components";
import { useGetAvatar } from "~/hooks";
import { OnContextMenu, VoidNoArgsFn } from "~/types";

interface Props {
  fullName: string;
  //REFACTOR: To template string
  lastSeen: string;
  onContactClick: VoidNoArgsFn;
  onContextMenu: OnContextMenu;
  userId: UserId;
}

const ListItem: React.FC<Props> = ({
  fullName,
  lastSeen,
  onContactClick,
  onContextMenu,
  userId,
}) => {
  const { avatarSrc } = useGetAvatar(userId);

  return (
    <Box.ListItemButton
      onContextMenu={onContextMenu}
      style={{
        borderRadius: "10px",
        display: "flex",
        gap: 10,
        height: "65px",
      }}
      onClick={onContactClick}
    >
      <Box.Div>
        <Box.Avatar src={avatarSrc} />
      </Box.Div>

      <Box.Div style={{ width: "100%" }}>
        <Box.Flex jc="space-between" ai="center">
          <Typography.Bold style={{ fontSize: 18 }}>{fullName}</Typography.Bold>
          {/* <Box.Div>time</Box.Div> */}
        </Box.Flex>

        <Box.Flex jc="space-between" ai="center">
          <Box.Div>{lastSeen}</Box.Div>
          {/* <Box.Div>icons</Box.Div> */}
        </Box.Flex>
      </Box.Div>
    </Box.ListItemButton>
  );
};

export default ListItem;
