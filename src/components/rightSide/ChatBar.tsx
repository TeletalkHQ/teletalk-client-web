import Box from "~/components/general/box";
import IconButton from "~/components/general/other/IconButton";
import Typography from "~/components/general/typography/Typography";
import { Icons } from "~/components/other/Icons";
import { VoidNoArgsFn } from "~/types";

interface Props {
  contactName: string;
  onMessageContainerCloseClick: VoidNoArgsFn;
  onChatBarClick: VoidNoArgsFn;
}

const ChatBar: React.FC<Props> = ({
  contactName,
  onChatBarClick,
  onMessageContainerCloseClick,
}) => {
  return (
    <>
      <Box.Paper
        style={{
          alignItems: "center",
          borderRadius: 0,
          display: "flex",
          height: 50,
          justifyContent: "space-between",
          padding: 5,
        }}
        onClick={onChatBarClick}
      >
        <Box.Div>
          <IconButton onClick={onMessageContainerCloseClick}>
            <Icons.Close.Icon />
          </IconButton>
        </Box.Div>

        <Box.Flex ai="center">
          <Typography
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            {contactName}
          </Typography>
        </Box.Flex>

        <Box.Div>
          <IconButton>
            <Icons.MoreVertical.Icon />
          </IconButton>
        </Box.Div>
      </Box.Paper>
    </>
  );
};

export default ChatBar;
