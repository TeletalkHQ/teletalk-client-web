import { useEffect } from "react";
import { PublicUserData } from "utility-store/lib/types";

import { maker } from "~/classes/Maker";
import { useGlobalStore } from "~/store";
import { UserId, UserItem } from "~/types";

import { useEmitter } from "./useEmitter";

type Updater = (u: UserId) =>
  | Promise<{
      publicUserData: PublicUserData;
    }>
  | {
      publicUserData: PublicUserData;
    };

type UseUserPublicData = (userId: UserId) => {
  loading: boolean;
  publicUserData: UserItem;
  updater: Updater;
};

export const useUserPublicData: UseUserPublicData = (userId) => {
  const globalStore = useGlobalStore();
  const { handler, loading } = useEmitter("getPublicUserData");

  useEffect(() => {
    updater(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updater: Updater = async (userId: UserId) => {
    if (!userId) return { publicUserData: maker.emptyUser() };

    return handler.emitFull({ userId }, ({ data }) => {
      const item = globalStore.users.find(
        (i) => i.userId === data.publicUserData.userId
      );

      if (item)
        return globalStore.updateUser({ ...data.publicUserData, ...item });

      globalStore.addUser({
        ...maker.emptyUser(),
        ...data.publicUserData,
      });
    });
  };

  return {
    loading,
    publicUserData:
      globalStore.users.find((i) => i.userId === userId) || maker.emptyUser(),
    updater,
  };
};
