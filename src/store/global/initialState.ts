import { appConfigs } from "~/classes/AppConfigs";
import { maker } from "~/classes/Maker";
import { GlobalState } from "~/types";

export const defaultDialogState = {
  open: false,
  //TODO: read default value from mui
  props: {
    zIndex: 1300,
  },
};

export const initialState: GlobalState = {
  contextMenu: {
    list: [],
    position: null,
  },
  dialogState: {
    addContact: defaultDialogState,
    addServer: defaultDialogState,
    blockUser: defaultDialogState,
    contacts: defaultDialogState,
    editBio: defaultDialogState,
    editContact: defaultDialogState,
    editContactWithCellphone: defaultDialogState,
    editFullName: defaultDialogState,
    editProfile: defaultDialogState,
    editUsername: defaultDialogState,
    initialSetup: defaultDialogState,
    logout: defaultDialogState,
    removeContact: defaultDialogState,
    servers: defaultDialogState,
    settings: defaultDialogState,
    userInfo: defaultDialogState,
  },
  drawer: {
    anchor: appConfigs.getConfigs().ui.drawerDefaultAnchor,
    open: false,
  },
  selectedContactFromContext: maker.emptyUser(),
  isOnline: false,
  loading: {
    color: "wheat",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
  users: [],
};
