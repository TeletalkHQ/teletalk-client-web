import { Box, Typography } from "~/components";
import { OnContextMenu, VoidNoArgsFn } from "~/types";

interface Props {
  fullName: string;
  //REFACTOR: To template string
  lastSeen: string;
  onContactClick: VoidNoArgsFn;
  onContextMenu: OnContextMenu;
}

const ListItem: React.FC<Props> = ({
  fullName,
  lastSeen,
  onContactClick,
  onContextMenu,
}) => {
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
        <Box.Avatar />
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
