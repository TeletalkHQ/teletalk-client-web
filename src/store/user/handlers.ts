import { maker } from "~/classes/Maker";
import { UserHandlers, UserSetState } from "~/types/store/user";

import { initialState } from "./initialState";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  setCurrentUserData(userData) {
    set({ currentUserData: userData });
  },

  setSelectedContactFromContext(u) {
    set(() => ({
      selectedContactFromContext: u,
    }));
  },

  updateUser(updatedUser) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (item) => item.userId === updatedUser.userId
      );

      const newUsers = [...prevState.users];

      const userItem =
        index < 0
          ? {
              ...maker.emptyUser(),
              ...updatedUser,
              ...maker.originalFullName(updatedUser),
            }
          : {
              ...newUsers[index],
              ...updatedUser,
            };

      if (index < 0) newUsers.push(userItem);
      else newUsers[index] = userItem;

      return {
        users: newUsers,
      };
    });
  },

  removeContact(removedContact) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (i) => i.userId === removedContact.userId
      );

      if (index < 0) return prevState;

      const newUsers = [...prevState.users];

      const item = newUsers[index];

      newUsers.splice(index, 1, {
        ...item,
        firstName: "",
        isContact: false,
        lastName: "",
      });

      return {
        users: newUsers,
      };
    });
  },

  setUsers(u) {
    set((prevState) => ({
      users: [...prevState.users, ...u],
    }));
  },

  reset() {
    set(initialState);
  },

  setAddingContactWithCellphone(item) {
    set({
      addingContactWithCellphone: item,
    });
  },
});
