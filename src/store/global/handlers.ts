import { GlobalHandlers, GlobalSetState } from "~/types";

export const handlers = (set: GlobalSetState) =>
  ({
    addUserWithContact(c) {
      set((prevState) => {
        return {
          users: [...prevState.users, { ...c, isContact: true }],
        };
      });
    },

    addUser(user) {
      set((prevState) => {
        return { users: [...prevState.users, user] };
      });
    },

    setUsers(users) {
      set((prevState) => {
        return { users: [...prevState.users, ...users] };
      });
    },

    changeGlobalLoadingOpen(open) {
      set((prevState) => {
        return {
          globalLoading: {
            ...prevState.globalLoading,
            open,
          },
        };
      });
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

    updateDialog(payload) {
      set((prevState) => {
        return {
          dialogState: {
            ...prevState.dialogState,
            [payload.dialogName]: {
              ...prevState.dialogState[payload.dialogName],
              open: payload.open,
              props: payload.props,
            },
          },
        };
      });
    },

    updateOnlineStatus(isOnline) {
      set({
        isOnline,
      });
    },
  } as GlobalHandlers);
