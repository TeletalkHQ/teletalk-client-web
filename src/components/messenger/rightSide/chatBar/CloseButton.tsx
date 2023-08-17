import IconButton from "~/components/general/other/IconButton";
import { Icons } from "~/components/other/Icons";
import { useMessageStore } from "~/store";

const ChatBarCloseButton = () => {
  const messageStore = useMessageStore();

  const handleMessageContainerClose = () => {
    messageStore.deselectChat();
  };

  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        handleMessageContainerClose();
      }}
    >
      <Icons.Close.Icon />
    </IconButton>
  );
};

export default ChatBarCloseButton;
