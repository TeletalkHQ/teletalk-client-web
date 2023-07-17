import { appConfigs } from "~/classes/AppConfigs";
import { GlobalState } from "~/types";

export const defaultDialogState = {
  open: false,
  //TODO: read default value from mui
  props: {
    zIndex: 1300,
  },
};

export const initialState: GlobalState = {
  drawer: {
    anchor: appConfigs.getConfigs().ui.drawerDefaultAnchor,
    open: false,
  },
  dialogState: {
    addContact: defaultDialogState,
    addServer: defaultDialogState,
    contacts: defaultDialogState,
    editBio: defaultDialogState,
    editFullName: defaultDialogState,
    editProfile: defaultDialogState,
    editUsername: defaultDialogState,
    logout: defaultDialogState,
    servers: defaultDialogState,
    settings: defaultDialogState,
    userInfo: defaultDialogState,
  },
  loading: {
    color: "wheat",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
  isOnline: false,
};
