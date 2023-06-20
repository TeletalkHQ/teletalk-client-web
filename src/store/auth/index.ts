import { create } from "zustand";

import { AuthSetState, AuthStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useAuthStore = create<AuthStore>((set: AuthSetState) => ({
  ...initialState,
  ...handlers(set),
}));
