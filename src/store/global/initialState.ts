import { appConfigs } from "~/classes/AppConfigs";
import { GlobalState } from "~/types";

const defaultDialogStateItemProps = {
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
    addContact: defaultDialogStateItemProps,
    contacts: defaultDialogStateItemProps,
    editBio: defaultDialogStateItemProps,
    editFullName: defaultDialogStateItemProps,
    editProfile: defaultDialogStateItemProps,
    editUsername: defaultDialogStateItemProps,
    logout: defaultDialogStateItemProps,
    settings: defaultDialogStateItemProps,
    userInfo: defaultDialogStateItemProps,
  },
  globalLoading: {
    color: "blue",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
  isOnline: false,
  users: [],
};

export { initialState };
