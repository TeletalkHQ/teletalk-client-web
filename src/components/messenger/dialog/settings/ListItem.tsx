import Box from "~/components/general/box";
import { IconType, VoidNoArgsFn } from "~/types";

import { SettingDisplayName } from "./types";

interface Props {
  onClick: VoidNoArgsFn;
  displayName: SettingDisplayName;
  Icon: IconType;
}

const ListItem: React.FC<Props> = ({ onClick, displayName, Icon }) => (
  <Box.ListItemButton
    style={{
      display: "flex",
      height: "65px",
      borderRadius: "10px",
      gap: 10,
      alignItems: "center",
    }}
    onClick={onClick}
  >
    <Icon style={{ fontSize: 30 }} />
    <Box.Div> {displayName}</Box.Div>
  </Box.ListItemButton>
);

export default ListItem;
