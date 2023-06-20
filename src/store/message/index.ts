import { create } from "zustand";

import { MessageSetState, MessageStore } from "~/types";

import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useMessageStore = create<MessageStore>((set: MessageSetState) => ({
  ...initialState,
  ...handlers(set),
}));
