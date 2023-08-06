import { GlobalHandlers, GlobalSetState, UserItem } from "~/types";

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

  closeContextMenu() {
    set((prevState) => ({
      contextMenu: {
        ...prevState.contextMenu,
        position: null,
      },
    }));
  },

  setSelectedContactFromContext(c) {
    set(() => ({
      selectedContactFromContext: c,
    }));
  },

  addUser(c: UserItem) {
    set((prevState) => {
      return {
        users: [...prevState.users, c],
      };
    });
  },

  updateUser(updatedUser) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (item) => item.userId === updatedUser.userId
      );
      const item = prevState.users[index];

      const newUsers = [...prevState.users];

      newUsers[index] = {
        ...item,
        ...updatedUser,
      };

      return {
        users: newUsers,
      };
    });
  },

  removeUser(removedUser) {
    set((prevState) => {
      const index = prevState.users.findIndex(
        (i) => i.userId === removedUser.userId
      );

      if (index < 0) return prevState;

      const newUsers = [...prevState.users];

      newUsers.splice(index, 1);

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
