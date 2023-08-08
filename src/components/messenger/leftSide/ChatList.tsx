import ChatListItem from "~/components/messenger/leftSide/chatListItem";
import { useMessageStore, useUserStore } from "~/store";
import { PrivateChatItem, SelectedChatInfo, UserId } from "~/types";

import { HandleChatListItemClick } from "./types";

interface Props {
  onChatListItemClick: HandleChatListItemClick;
  selectedUserToChat: SelectedChatInfo;
}

const ChatList: React.FC<Props> = ({
  onChatListItemClick,
  selectedUserToChat,
}) => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  return (
    <>
      {messageStore.privateChats.map((p, index) => {
        const targetUserId = findTargetUserId(p, userStore.userId);
        const lastMessage = getLastMessage(p);

        return (
          <ChatListItem
            onClick={() =>
              onChatListItemClick({
                chatId: p.chatId,
                userId: targetUserId,
              })
            }
            key={index}
            userId={targetUserId}
            messageText={lastMessage.messageText}
            selected={selectedUserToChat.userId === targetUserId}
          />
        );
      })}
    </>
  );
};

export default ChatList;

const findTargetUserId = (p: PrivateChatItem, userId: UserId) => {
  return (
    p.participants.find((participant) => participant.participantId !== userId)
      ?.participantId || ""
  );
};

const getLastMessage = (p: PrivateChatItem) => p.messages.at(-1)!;
