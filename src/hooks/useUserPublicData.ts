import { useEffect } from "react";

import { maker } from "~/classes/Maker";
import { useGlobalStore } from "~/store";
import { UserId, UserItem } from "~/types";

import { useEmitter } from "./useEmitter";

type Updater = (u: UserId) =>
  | Promise<{
      publicData: UserItem;
    }>
  | {
      publicData: UserItem;
    };

type UseUserPublicData = (userId: UserId) => {
  loading: boolean;
  publicData: UserItem;
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
    if (!userId) return { publicData: maker.emptyUser() };

    const {
      data: { publicUserData },
    } = await handler.emitFull({ userId });

    const item = globalStore.users.find(
      (i) => i.userId === publicUserData.userId
    );

    const userItem: UserItem = maker.user(publicUserData, item);

    globalStore.updateUser(userItem);

    return {
      publicData: userItem,
    };
  };

  return {
    loading,
    publicData:
      globalStore.users.find((i) => i.userId === userId) || maker.emptyUser(),
    updater,
  };
};
