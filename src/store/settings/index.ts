import { create } from "zustand";

import { SettingsStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
