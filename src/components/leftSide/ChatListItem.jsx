import Avatar from "src/components/general/other/Avatar";
import { Box } from "src/components/general/box";

const ChatListItem = ({ message, name, onChatListItemClick, selected }) => {
  return (
    <Box.ListItem
      button
      selected={selected}
      sx={{
        display: "flex",
        height: "65px",
      }}
      onClick={onChatListItemClick}
    >
      <Box.Div>
        <Avatar />
      </Box.Div>
      <Box.Flex col sx={{ width: "100%" }}>
        <Box.Flex sx={{ width: "100%" }} jc="space-between" ai="center">
          <Box.Div>{name}</Box.Div>
          <Box.Div>time</Box.Div>
        </Box.Flex>
        <Box.Flex jc="space-between" sx={{ width: "100%" }} ai="center">
          <Box.Div>{message}</Box.Div>
          <Box.Div>icons</Box.Div>
        </Box.Flex>
      </Box.Flex>
    </Box.ListItem>
  );
};

export default ChatListItem;
