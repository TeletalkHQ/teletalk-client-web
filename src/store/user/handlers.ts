import { UserHandlers, UserSetState } from "~/types/store/user";

export const handlers = (set: UserSetState) =>
  ({
    setUserData(userData) {
      set(userData);
    },
  } as UserHandlers);
