import { useEffect } from "react";
import { UserId } from "teletalk-type-store";

import { UserItem } from "~/types";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

type UseUserPublicData = (userId: UserId) => {
  loading: boolean;
  publicData: UserItem;
};

export const useUserPublicData: UseUserPublicData = (userId) => {
  const { data: publicData } = useFindUserById(userId);
  const { handler, loading } = useEmitter("getPublicData");

  useEffect(() => {
    if (!userId) return;

    handler.emitFull({
      userId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    loading,
    publicData,
  };
};
