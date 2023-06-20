import { create } from "zustand";

import { GlobalSetState, GlobalStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useGlobalStore = create<GlobalStore>((set: GlobalSetState) => ({
  ...initialState,
  ...handlers(set),
}));
