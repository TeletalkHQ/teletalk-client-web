import Avatar from "src/components/general/other/Avatar";
import { Box } from "src/components/general/box";

const ContactListItem = ({ name, lastSeen = "", onContactClick }) => {
  return (
    <Box.ListItem
      button
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onContactClick}
    >
      <Box.Div>
        <Avatar />
      </Box.Div>
      <Box.Div style={{ width: "100%", ml: 1 }}>
        <Box.Flex jc="space-between" ai="center">
          <Box.Div>{name}</Box.Div>
          {/* <Box.Div>time</Box.Div> */}
        </Box.Flex>
        <Box.Flex jc="space-between" ai="center">
          <Box.Div>{lastSeen}</Box.Div>
          {/* <Box.Div>icons</Box.Div> */}
        </Box.Flex>
      </Box.Div>
    </Box.ListItem>
  );
};

export default ContactListItem;
