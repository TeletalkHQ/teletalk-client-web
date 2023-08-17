import { userUtils } from "~/classes/UserUtils";
import Box from "~/components/general/box";
import { Typography } from "~/components/general/typography";
import { useUserPublicData } from "~/hooks";
import { useMessageStore } from "~/store";

const ChatBarCenterContent = () => {
  const messageStore = useMessageStore();

  const { publicData } = useUserPublicData(
    messageStore.selectedChatInfo.userId
  );

  const fullName = userUtils.concatFirstNameWithLastName(publicData);

  return (
    <Box.Flex ai="center">
      <Typography.Bold
        style={{
          fontSize: 18,
        }}
      >
        {fullName}
      </Typography.Bold>
    </Box.Flex>
  );
};

export default ChatBarCenterContent;
