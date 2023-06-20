import { create } from "zustand";

import { SettingsSetState, SettingsStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useSettingsStore = create<SettingsStore>(
  (set: SettingsSetState) => ({
    ...initialState,
    ...handlers(set),
  })
);
