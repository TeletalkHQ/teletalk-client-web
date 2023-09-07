import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";
import { UserId } from "~/types";

export const useFindUserById = (userId: UserId) => {
  const userStore = useUserStore();

  const finder = (u: UserId) => {
    return (
      userStore.users.find((i) => i.userId === (u || userId)) ||
      maker.emptyUser()
    );
  };

  return {
    finder,
    data: finder(userId),
  };
};
