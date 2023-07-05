import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useMessageStore } from "~/store";
import { ChatId, GetPrivateChatIO } from "~/types";

export const useAddPrivateChat = () => {
  const messageStore = useMessageStore();

  const updater = (chatId: ChatId) => {
    return socketEmitterStore.events.getPrivateChat.emitFull<GetPrivateChatIO>(
      { chatId },
      async ({ data }) => {
        messageStore.addPrivateChat(data.privateChat);

        return data;
      }
    );
  };

  return { updater };
};
