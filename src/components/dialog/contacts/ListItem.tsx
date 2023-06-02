import Avatar from "~/components/general/other/Avatar";
import { Box } from "~/components/general/box";

const ListItem = ({ name, lastSeen, onContactClick }) => {
  return (
    <Box.ListItemButton
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
          <Box.Div style={{ fontWeight: 500, fontSize: 18 }}>{name}</Box.Div>
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
