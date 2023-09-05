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

export const useUserPublicData: UseUserPublicData = (externalUserId) => {
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("getPublicData");

  useEffect(() => {
    updater(externalUserId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalUserId]);

  const updater: Updater = async (userId: UserId) => {
    if (!userId)
      return {
        publicData: maker.emptyUser(),
      };

    const {
      data: { publicData },
    } = await handler.emitFull({
      userId,
    });

    const item = findByUserId(publicData.userId);

    const userItem: UserItem = maker.userWithPublicData(publicData, item);

    userStore.updateUser(userItem);

    return {
      publicData: userItem,
    };
  };

  const findByUserId = (userId: UserId) =>
    userStore.users.find((item) => item.userId === userId);

  return {
    loading,
    publicData: findByUserId(externalUserId) || maker.emptyUser(),
    updater,
  };
};
