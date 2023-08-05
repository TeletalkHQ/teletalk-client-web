import { useEffect } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { useGlobalStore } from "~/store";
import { UserId, UserItem } from "~/types";

import { useEmitter } from "./useEmitter";

type UseUserPublicData = (userId: UserId) => {
  publicUserData: UserItem;
  updater: (u: UserId) => Promise<{
    publicUserData: PublicUserData;
  }>;
};

export const useUserPublicData: UseUserPublicData = (userId) => {
  const globalStore = useGlobalStore();
  const { handler } = useEmitter("getPublicUserData");

  useEffect(() => {
    updater(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updater = (userId: UserId) => {
    return handler.emitFull({ userId }, ({ data }) => {
      const userItem =
        globalStore.users.find(
          (i) => i.userId === data.publicUserData.userId
        ) || {};

      globalStore.updateUser({ ...data.publicUserData, ...userItem });
    });
  };

  return {
    publicUserData: globalStore.users.find((i) => i.userId === userId) || {
      ...maker.emptyUserPublicData(),
      ...maker.emptyCellphone(),
      isContact: false,
      isPublicDataUpdated: false,
    },
    updater,
  };
};
