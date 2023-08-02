import { useEffect } from "react";

import { useMessageStore, useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";

export const useSetPrivateChats = () => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();
  const { handler } = useEmitter("getPrivateChats");
  useEffect(() => {
    if (userStore.userId) updater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userId]);

  const updater = async () => {
    await handler.emitFull({}, async ({ data }) => {
      messageStore.setPrivateChats(data.privateChats);

      return data;
    });
  };

  return { updater };
};
