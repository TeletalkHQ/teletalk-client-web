import { maker } from "~/classes/Maker";
import { GlobalHandlers, GlobalSetState } from "~/types";

import { defaultDialogState } from "./initialState";

export const handlers: (set: GlobalSetState) => GlobalHandlers = (set) => ({
  openLoading(type) {
    set((prevState) => {
      return {
        loading: {
          ...prevState.loading,
          open: true,
          type: type || prevState.loading.type,
        },
      };
    });
  },
  closeLoading(type) {
    set((prevState) => {
      return {
        loading: {
          ...prevState.loading,
          open: false,
          type: type || prevState.loading.type,
        },
      };
    });
  },

  openOverlayLoading() {
    this.openLoading("OVERLAY");
  },
  closeOverlayLoading() {
    this.closeLoading("OVERLAY");
  },

  openFullPageLoading() {
    this.openLoading("FULL_PAGE");
  },
  closeFullPageLoading() {
    this.closeLoading("FULL_PAGE");
  },

  changeDrawerOpen(open) {
    set((prevState) => {
      return {
        drawer: {
          ...prevState.drawer,
          open,
        },
      };
    });
  },

  // updateDialog(payload) {
  //   set((prevState) => {
  //     return {
  //       dialogState: {
  //         ...prevState.dialogState,
  //         [payload.dialogName]: {
  //           ...prevState.dialogState[payload.dialogName],
  //           open: payload.open,
  //           props: payload.props,
  //         },
  //       },
  //     };
  //   });
  // },

  updateOnlineStatus(isOnline) {
    set({
      isOnline,
    });
  },

  openDialog(dialogName, props = defaultDialogState.props) {
    set((prevState) => ({
      dialogState: {
        ...prevState.dialogState,
        [dialogName]: {
          open: true,
          props,
        },
      },
    }));
  },

  closeDialog(dialogName, props = defaultDialogState.props) {
    set((prevState) => ({
      dialogState: {
        ...prevState.dialogState,
        [dialogName]: {
          open: false,
          props,
        },
      },
    }));
  },

  handleContextMenu(e: React.MouseEvent, list) {
    e.preventDefault();

    set((prevState) => ({
      contextMenu:
        prevState.contextMenu.position === null
          ? {
              list,
              position: {
                mouseX: e.clientX + 2,
                mouseY: e.clientY - 6,
              },
            }
          : {
              list: [],
              position: null,
            },
    }));
  },

  updateContextMenuList(list) {
    set((prevState) => ({
      contextMenu: {
        ...prevState.contextMenu,
        list,
      },
    }));
  },

  closeContextMenu() {
    set((prevState) => ({
      contextMenu: {
        ...prevState.contextMenu,
        position: null,
      },
    }));
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
});
