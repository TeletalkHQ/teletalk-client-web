import { useEffect, useState } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useMessageStore, useUserStore } from "~/store";
import { GetPublicUserDataIO, UserId } from "~/types";

type UseGetPublicUserData = (userId?: UserId) => {
  publicUserData: PublicUserData;
  updater: (u: UserId) => Promise<{
    publicUserData: PublicUserData;
  }>;
};

export const useGetPublicUserData: UseGetPublicUserData = (userId) => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  const [publicUserData, setPublicUserData] = useState<PublicUserData>(
    maker.emptyUserPublicData()
  );

  useEffect(() => {
    const { userId: targetUserId } = messageStore.selectedChatInfo;

    if (userId) updater(userId);
    else updater(targetUserId);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageStore.selectedChatInfo, userId]);

  const updater = (userId: UserId) => {
    return socketEmitterStore.events.getPublicUserData.emitFull<GetPublicUserDataIO>(
      { userId },
      async ({ data }) => {
        const contactItem =
          userStore.contacts.find(
            (i) => i.userId === data.publicUserData.userId
          ) || {};

        setPublicUserData({ ...data.publicUserData, ...contactItem });

        return data;
      }
    );
  };

  return {
    publicUserData,
    updater,
  };
};
