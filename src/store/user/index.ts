import { create } from "zustand";

import { UserStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
