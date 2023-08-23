import { Box } from "~/components";
import { useGlobalStore } from "~/store";

import ChatBarCenterContent from "./CenterContent";
import ChatBarCloseButton from "./CloseButton";
import ChatBarMenu from "./Menu";

interface Props {}

const ChatBar: React.FC<Props> = () => {
  const globalStore = useGlobalStore();

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
        <ChatBarCloseButton />

        <ChatBarCenterContent />

        <ChatBarMenu />
      </Box.Paper>
    </>
  );
};

export default ChatBar;
