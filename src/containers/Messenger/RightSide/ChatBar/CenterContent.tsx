import { userUtils } from "~/classes/UserUtils";
import { Box, Typography } from "~/components";
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
