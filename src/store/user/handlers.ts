import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { UserHandlers, UserSetState } from "~/types/store/user";

import { initialState } from "./initialState";

export const handlers: (set: UserSetState) => UserHandlers = (set) => ({
  setCurrentUserData(userData) {
    set({ currentUserData: userData });
  },

  setSelectedUserIdForActions(u) {
    set(() => ({
      selectedUserIdForActions: u,
    }));
  },

  addContactWithCellphone(newContact) {
    this.updateUser({
      ...newContact,
      isContact: true,
    });
  },

  addContactWithUserId(newContact) {
    this.updateUser({
      ...newContact,
      isContact: true,
    });
  },

  addBlock({ userId }) {
    this.updateUser({
      userId,
      isBlocked: true,
    });
  },

  removeBlock({ userId }) {
    this.updateUser({
      userId,
      isBlocked: false,
    });
  },

  updateUser(updatedUser) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (item) => item.userId === updatedUser.userId
      );

      const newUsers = [...prevState.users];

      if (index < 0) {
        newUsers.push({
          ...maker.emptyUser(),
          ...updatedUser,
          ...maker.originalFullName(updatedUser),
        });
      } else {
        newUsers[index] = {
          ...newUsers[index],
          ...updatedUser,
        };
      }

      return {
        users: newUsers,
      };
    });
  },

  updateCurrentUserPublicData(publicData) {
    set((prevState) => ({
      currentUserData: {
        ...extractor.currentUserData({
          ...prevState.currentUserData,
        }),
        ...publicData,
      },
    }));
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
        countryCode: "",
        countryName: "",
        firstName: "",
        isContact: false,
        lastName: "",
        phoneNumber: "",
      });

      return {
        users: newUsers,
      };
    });
  },

  reset() {
    set(initialState);
  },

  setUsers(u) {
    set((prevState) => ({
      users: [...prevState.users, ...u],
    }));
  },

  setAddingContactWithCellphone(addingContact) {
    set((prevState) => ({
      addingContactWithCellphone: {
        ...prevState.addingContactWithCellphone,
        ...addingContact,
      },
    }));
  },

  setAddingContactWithUserId(addingContact) {
    set((prevState) => ({
      addingContactWithUserId: {
        ...prevState.addingContactWithUserId,
        ...addingContact,
      },
    }));
  },
});
