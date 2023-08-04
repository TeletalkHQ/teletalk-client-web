import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
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
        display: "flex",
        height: "65px",
        borderRadius: "10px",
        gap: 10,
      }}
      onClick={onContactClick}
    >
      <Box.Div>
        <Avatar />
      </Box.Div>

      <Box.Div style={{ width: "100%" }}>
        <Box.Flex jc="space-between" ai="center">
          <Box.Div style={{ fontWeight: 500, fontSize: 18 }}>
            {fullName}
          </Box.Div>
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
