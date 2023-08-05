import { userUtils } from "~/classes/UserUtils";
import Box from "~/components/general/box";
import IconButton from "~/components/general/other/IconButton";
import Typography from "~/components/general/typography/Typography";
import { Icons } from "~/components/other/Icons";
import { useUserPublicData } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

interface Props {}

const ChatBar: React.FC<Props> = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const { publicUserData } = useUserPublicData();

  const fullName = userUtils.concatFirstNameWithLastName(publicUserData);

  const handleMessageContainerCloseClick = () => {
    messageStore.deselectChat();
  };

  const handleChatBarClick = () => {
    globalStore.openDialog("userInfo");
  };

  return (
    <>
      <Box.Paper
        onClick={handleChatBarClick}
        style={{
          alignItems: "center",
          borderRadius: 0,
          cursor: "pointer",
          display: "flex",
          height: 50,
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <Box.Div>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleMessageContainerCloseClick();
            }}
          >
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
            {fullName}
          </Typography>
        </Box.Flex>

        <Box.Div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconButton>
            <Icons.MoreVertical.Icon />
          </IconButton>
        </Box.Div>
      </Box.Paper>
    </>
  );
};

export default ChatBar;
