import { useEffect } from "react";

import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";
import { UserId, UserItem } from "~/types";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

type UseUserPublicData = (userId: UserId) => {
  loading: boolean;
  publicData: UserItem;
};

export const useUserPublicData: UseUserPublicData = (externalUserId) => {
  const userStore = useUserStore();
  const { data: user, finder } = useFindUserById(externalUserId);
  const { handler, loading } = useEmitter("getPublicData");

  useEffect(() => {
    updater(externalUserId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalUserId]);

  const updater = async (userId: UserId) => {
    if (!userId)
      return {
        publicData: maker.emptyUser(),
      };

    const {
      data: { publicData },
    } = await handler.emitFull({
      userId,
    });

    const item = finder(publicData.userId);

    const userItem: UserItem = maker.userWithPublicData(publicData, item);

    userStore.updateUser(userItem);

    return {
      publicData: userItem,
    };
  };

  return {
    loading,
    publicData: user,
  };
};
