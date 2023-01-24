import Avatar from "src/components/general/other/Avatar";
import { Box } from "src/components/general/box";

import { Icons } from "src/components/other/Icons";
import IconButton from "src/components/general/other/IconButton";
import Typography from "src/components/general/typography/Typography";

const ChatBar = ({ contactName, onMessageContainerCloseClick }) => {
  return (
    <>
      <Box.Paper sx={{ width: "100%", height: "100%" }}>
        <Box.Flex
          sx={{ width: "100%", height: "100%" }}
          jc="space-between"
          ai="center"
        >
          <Box.Div>
            <IconButton onClick={onMessageContainerCloseClick}>
              <Icons.Close.Icon />
            </IconButton>
          </Box.Div>
          <Box.Flex ai="center">
            <Avatar alt={contactName} />
            <Typography>{contactName}</Typography>
          </Box.Flex>
          <Box.Div>
            <IconButton>
              <Icons.MoreVertical.Icon />
            </IconButton>
          </Box.Div>
        </Box.Flex>
      </Box.Paper>
    </>
  );
};

export default ChatBar;
