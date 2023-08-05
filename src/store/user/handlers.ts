import { UserHandlers, UserSetState } from "~/types/store/user";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  setUserData(userData) {
    set(userData);
  },
});
