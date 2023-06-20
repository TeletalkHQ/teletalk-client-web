import { create } from "zustand";

import { UserSetState, UserStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useUserStore = create<UserStore>((set: UserSetState) => ({
  ...initialState,
  ...handlers(set),
}));
