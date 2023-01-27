import { Box } from "src/components/general/box";

import { Icons } from "src/components/other/Icons";
import IconButton from "src/components/general/other/IconButton";
import Typography from "src/components/general/typography/Typography";

const ChatBar = ({ contactName, onMessageContainerCloseClick }) => {
  return (
    <>
      <Box.Paper style={{ borderRadius: 0 }}>
        <Box.Flex
          style={{ height: 50, padding: 5 }}
          jc="space-between"
          ai="center"
        >
          <Box.Div>
            <IconButton onClick={onMessageContainerCloseClick}>
              <Icons.Close.Icon />
            </IconButton>
          </Box.Div>
          <Box.Flex ai="center">
            <Typography style={{ fontWeight: "500", fontSize: 18 }}>
              {contactName}
            </Typography>
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
