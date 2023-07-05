import { useEffect } from "react";

import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useMessageStore, useUserStore } from "~/store";
import { GetPrivateChatsIO } from "~/types";

export const useSetPrivateChats = () => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.userId) updater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userId]);

  const updater = async () => {
    await socketEmitterStore.events.getPrivateChats.emitFull<GetPrivateChatsIO>(
      {},
      async ({ data }) => {
        messageStore.setPrivateChats(data.privateChats);

        return data;
      }
    );
  };

  return { updater };
};
