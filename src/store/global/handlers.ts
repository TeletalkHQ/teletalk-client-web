import { GlobalHandlers, GlobalSetState } from "~/types";

import { defaultDialogState } from "./initialState";

export const handlers: (set: GlobalSetState) => GlobalHandlers = (set) => ({
  openGlobalLoading() {
    set((prevState) => {
      return {
        globalLoading: {
          ...prevState.globalLoading,
          open: true,
        },
      };
    });
  },

  closeGlobalLoading() {
    set((prevState) => {
      return {
        globalLoading: {
          ...prevState.globalLoading,
          open: false,
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
});
