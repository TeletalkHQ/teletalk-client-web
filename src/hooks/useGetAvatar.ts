import { useEffect } from "react";
import { UserId } from "teletalk-type-store";

import { useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

export const useGetAvatar = (userId: UserId) => {
  const userStore = useUserStore();
  const { handler: getAvatarHandler, loading } = useEmitter("getAvatar");
  const {
    data: { avatarSrc },
  } = useFindUserById(userId);

  useEffect(() => {
    handler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handler = () => {
    if (!userId) return;
    if (userStore.users.find((i) => i.userId === userId)?.avatarSrc) return;

    getAvatarHandler.emitFull({ userId }, (response) => {
      userStore.updateUser(response.data);
    });
  };

  return {
    avatarSrc,
    handler,
    loading,
  };
};
