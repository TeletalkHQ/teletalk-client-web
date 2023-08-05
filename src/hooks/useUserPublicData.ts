import { useEffect, useState } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { useGlobalStore, useMessageStore } from "~/store";
import { UserId } from "~/types";

import { useEmitter } from "./useEmitter";

type UseUserPublicData = (userId?: UserId) => {
  publicUserData: PublicUserData;
  updater: (u: UserId) => Promise<{
    publicUserData: PublicUserData;
  }>;
};

export const useUserPublicData: UseUserPublicData = (userId) => {
  const messageStore = useMessageStore();
  const globalStore = useGlobalStore();
  const { handler } = useEmitter("getPublicUserData");
  const [publicUserData, setPublicUserData] = useState<PublicUserData>(
    maker.emptyUserPublicData()
  );

  useEffect(() => {
    const { userId: targetUserId } = messageStore.selectedChatInfo;
    updater(userId || targetUserId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageStore.selectedChatInfo, userId]);

  const updater = (userId: UserId) => {
    return handler.emitFull({ userId }, ({ data }) => {
      const contactItem =
        globalStore.users.find(
          (i) => i.userId === data.publicUserData.userId
        ) || {};

      setPublicUserData({ ...data.publicUserData, ...contactItem });
    });
  };

  return {
    publicUserData,
    updater,
  };
};
