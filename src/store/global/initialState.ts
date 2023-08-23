import { appConfigs } from "~/classes/AppConfigs";
import { DialogName, DialogState, GlobalState } from "~/types";

export const defaultDialogState = {
  open: false,
  //TODO: read default value from mui
  props: {
    zIndex: 1300,
  },
};

export const dialogNames = [
  "addContactWithCellphone",
  "addContactWithUserId",
  "addServer",
  "advanced",
  "blockUser",
  "callSettings",
  "chatSettings",
  "contacts",
  "editBio",
  "editContact",
  "editContactWithCellphone",
  "editFullName",
  "editPhoneNumber",
  "editProfile",
  "editUsername",
  "language",
  "logout",
  "notificationsAndSounds",
  "privacyAndSecurity",
  "removeContact",
  "servers",
  "serverSetup",
  "settings",
  "userInfo",
] as const;

export const initialState: GlobalState = {
  contextMenu: {
    list: [],
    position: null,
  },
  dialogState: dialogNames.reduce(
    (prevValue, currValue) => {
      prevValue[currValue] = defaultDialogState;
      return prevValue;
    },
    {} as { [key in DialogName]: DialogState }
  ),
  drawer: {
    anchor: appConfigs.getConfigs().ui.drawerDefaultAnchor,
    open: false,
  },
  isOnline: false,
  loading: {
    color: "wheat",
    open: false,
    progressColor: "inherit",
    size: 80,
    speedMultiplier: 1,
    type: "FULL_PAGE",
  },
};
