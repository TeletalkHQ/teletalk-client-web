import { Box } from "~/components/general/box";

const ListItem = ({ disabled, displayName, onItemClick, value, Icon }) => (
  <Box.ListItemButton
    disabled={disabled}
    onClick={onItemClick}
    style={{
      alignItems: "center",
      borderRadius: "10px",
      display: "flex",
      gap: 10,
      height: "65px",
      width: "100%",
    }}
  >
    <Icon style={{ fontSize: 30 }} />
    <Box.Flex
      style={{
        width: "90%",
        minWidth: 0,
        gap: 10,
      }}
      jc="space-between"
    >
      <Box.Span style={{ minWidth: "50px" }}>{displayName}</Box.Span>
      <Box.Span
        style={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: "#1976d2",
        }}
      >
        {value}
      </Box.Span>
    </Box.Flex>
  </Box.ListItemButton>
);

export default ListItem;
