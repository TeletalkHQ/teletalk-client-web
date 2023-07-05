import { useEffect } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { useMessageStore } from "~/store";
import { EventName, SendPrivateMessageIO } from "~/types";

import { useAddPrivateChat } from "./useAddPrivateChat";

export const useNewPrivateChatMessage = () => {
  const messageStore = useMessageStore();
  const { updater: privateChatUpdater } = useAddPrivateChat();

  useEffect(() => {
    turnOffUpdater();
    websocket.client.on<EventName>("sendPrivateMessage", updater);

    return turnOffUpdater;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageStore]);

  const turnOffUpdater = () => {
    websocket.client.off<EventName>("sendPrivateMessage", updater);
  };

  const updater = async (data: SendPrivateMessageIO["output"]) => {
    if (messageStore.privateChats.some((i) => i.chatId === data.chatId))
      messageStore.addMessage(data);
    else privateChatUpdater(data.chatId);
  };

  return { updater };
};
