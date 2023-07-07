import { appConfigs } from "~/classes/AppConfigs";
import { GlobalState } from "~/types";

const defaultDialogState = {
  open: false,
  //TODO: read default value from mui
  props: {
    zIndex: 1300,
  },
};

const initialState: GlobalState = {
  drawer: {
    anchor: appConfigs.getConfigs().ui.drawerDefaultAnchor,
    open: false,
  },
  dialogState: {
    addContact: defaultDialogState,
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
    color: "blue",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
  isOnline: false,
};

export { initialState, defaultDialogState };
