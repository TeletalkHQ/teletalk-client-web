import { ContactItem } from "utility-store/lib/types";

import { UserHandlers, UserSetState } from "~/types/store/user";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  setUserData(userData) {
    set(userData);
  },

  addContact(c: ContactItem) {
    set((prevState) => {
      return {
        contacts: [...prevState.contacts, c],
      };
    });
  },

  editContact(updatedContact) {
    set((prevState) => {
      const index = prevState.contacts.findIndex(
        (item) => item.userId === updatedContact.userId
      );
      const item = prevState.contacts[index];

      const newContacts = [...prevState.contacts];

      newContacts[index] = {
        ...item,
        ...updatedContact,
      };

      return {
        contacts: newContacts,
      };
    });
  },
});
