import { ContactItem } from "utility-store/lib/types";

import { UserHandlers, UserSetState } from "~/types/store/user";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  setUserData(userData) {
    set(userData);
  },

  addContact(c: ContactItem) {
    set((prevState) => {
      return {
        ...prevState,
        contacts: [...prevState.contacts, c],
      };
    });
  },
});
