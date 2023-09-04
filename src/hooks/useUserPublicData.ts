import { useEffect } from "react";

import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";
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
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("getPublicData");

  useEffect(() => {
    updater(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const updater: Updater = async (userId: UserId) => {
    if (!userId) return { publicData: maker.emptyUser() };

    const {
      data: { publicData },
    } = await handler.emitFull({ userId });

    const item = userStore.users.find((i) => i.userId === publicData.userId);

    const userItem: UserItem = maker.user(publicData, item);

    userStore.updateUser(userItem);

    return {
      publicData: userItem,
    };
  };

  return {
    loading,
    publicData:
      userStore.users.find((i) => i.userId === userId) || maker.emptyUser(),
    updater,
  };
};
