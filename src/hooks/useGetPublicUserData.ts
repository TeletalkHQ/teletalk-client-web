import { useEffect, useState } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { useMessageStore, useUserStore } from "~/store";
import { UserId } from "~/types";

import { useEmitter } from "./useEmitter";

type UseGetPublicUserData = (userId?: UserId) => {
  publicUserData: PublicUserData;
  updater: (u: UserId) => Promise<{
    publicUserData: PublicUserData;
  }>;
};

export const useGetPublicUserData: UseGetPublicUserData = (userId) => {
  const messageStore = useMessageStore();
  const userStore = useUserStore();
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
    return handler.emitFull({ userId }, async ({ data }) => {
      const contactItem =
        userStore.contacts.find(
          (i) => i.userId === data.publicUserData.userId
        ) || {};

      setPublicUserData({ ...data.publicUserData, ...contactItem });

      return data;
    });
  };

  return {
    publicUserData,
    updater,
  };
};
