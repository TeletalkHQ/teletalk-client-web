import { Box } from "src/components/general/box";

const ListItem = ({ onSettingItemClick, displayName, Icon }) => (
  <Box.ListItemButton
    style={{
      display: "flex",
      height: "65px",
      borderRadius: "10px",
      gap: 10,
      alignItems: "center",
    }}
    onClick={onSettingItemClick}
  >
    <Icon style={{ fontSize: 30 }} />
    <Box.Div> {displayName}</Box.Div>
  </Box.ListItemButton>
);

export default ListItem;
