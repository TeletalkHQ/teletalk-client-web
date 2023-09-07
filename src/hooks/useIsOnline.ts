import { useUserStore } from "~/store";
import { UserId } from "~/types";

export const useIsOnline = (userId: UserId) => {
  const userStore = useUserStore();

  return {
    isOnline: !!userStore.onlineUsers.find((i) => i.userId === userId)
      ?.isOnline,
  };
};
