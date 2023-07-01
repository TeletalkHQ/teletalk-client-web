import { create } from "zustand";

import { GlobalStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
