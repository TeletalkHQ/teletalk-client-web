import { useEffect, useState } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { useMessageStore, useUserStore } from "~/store";
import { GetPublicUserDataIO, UserId } from "~/types";

export const useGetPublicUserData = (userId?: UserId): PublicUserData => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();

  const [publicUserData, setPublicUserData] = useState<PublicUserData>(
    maker.emptyUserPublicData()
  );

  useEffect(() => {
    const { userId: targetUserId } = messageStore.selectedChatInfo;

    if (userId) handleSetUserPublicData(userId);
    else handleSetUserPublicData(targetUserId);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageStore.selectedChatInfo, userId]);

  const handleSetUserPublicData = async (userId: UserId) => {
    socketEmitterStore.events.getPublicUserData.emitFull<GetPublicUserDataIO>(
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

  return publicUserData;
};
