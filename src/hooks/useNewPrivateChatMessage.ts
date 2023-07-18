import { useEffect } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { useMessageStore } from "~/store";
import { EventName, SendPrivateMessageIO, SocketResponse } from "~/types";

import { useAddPrivateChat } from "./useAddPrivateChat";

export const useNewPrivateChatMessage = () => {
  const messageStore = useMessageStore();
  const { updater: privateChatUpdater } = useAddPrivateChat();

  useEffect(() => {
    websocket.client.on<EventName>("sendPrivateMessage", updater);

    return turnOffUpdater;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageStore]);

  const turnOffUpdater = () => {
    websocket.client.off<EventName>("sendPrivateMessage", updater);
  };

  const updater = async (
    response: SocketResponse<SendPrivateMessageIO["output"]>
  ) => {
    if (
      messageStore.privateChats.some((i) => i.chatId === response.data.chatId)
    )
      messageStore.addMessage(response.data);
    else privateChatUpdater(response.data.chatId);
  };

  return {
    updater,
  };
};
