import { useMessageStore } from "~/store";
import { ChatId } from "~/types";

import { useEmitter } from "./useEmitter";

export const useAddPrivateChat = () => {
  const messageStore = useMessageStore();
  const { handler } = useEmitter("getPrivateChat");

  const updater = (chatId: ChatId) => {
    return handler.emitFull({ chatId }, async ({ data }) => {
      messageStore.addPrivateChat(data.privateChat);

      return data;
    });
  };

  return { updater };
};
