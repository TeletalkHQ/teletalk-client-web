import { create } from "zustand";

import { MessageStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useMessageStore = create<MessageStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
