import { create } from "zustand";

import { UserState, UserStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useUserStore = create<UserStore>((set) => ({
  ...(initialState as UserState),
  ...handlers(set),
}));
