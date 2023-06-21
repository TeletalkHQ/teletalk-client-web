import { CSSProperties } from "react";
import { FullName } from "utility-store/lib/types";

import { StoreSetFn } from ".";
import { Cellphone } from "..";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type DialogName =
  | "addContact"
  | "advanced"
  | "callSettings"
  | "chatSettings"
  | "contacts"
  | "editBio"
  | "editFullName"
  | "editProfile"
  | "editProfile"
  | "editUsername"
  | "language"
  | "logout"
  | "notificationsAndSounds"
  | "privacyAndSecurity"
  | "settings"
  | "userInfo";

export interface DialogProps {
  zIndex: number;
}

export interface DialogState {
  open: boolean;
  props: DialogProps;
}

export interface ContactItem extends FullName, Cellphone {
  userId: string;
  isContact: boolean;
}

export interface UserItem extends ContactItem {}

export type Users = UserItem[];

export interface GlobalHandlers {
  addUserWithContact: (c: ContactItem) => void;
  addUser: (u: UserItem) => void;
  setUsers: (u: Users) => void;
  openGlobalLoading: () => void;
  changeDrawerOpen: (o: boolean) => void;
  updateDialog: (dialogState: DialogState & { dialogName: DialogName }) => void;
  updateOnlineStatus: (isOnline: boolean) => void;
  openDialog: (dialogName: DialogName, props?: DialogProps) => void;
  closeDialog: (dialogName: DialogName, props?: DialogProps) => void;
}

export type GlobalLoadingType = "FULL_PAGE" | "OVERLAY";

export interface LoadingState {
  color: "blue";
  open: false;
  progressColor: "inherit";
  size: number;
  speedMultiplier: number;
  type: GlobalLoadingType;
}

export interface GlobalState {
  drawer: {
    anchor: DrawerAnchor;
    open: boolean;
  };
  dialogState: {
    addContact: DialogState;
    contacts: DialogState;
    editBio: DialogState;
    editFullName: DialogState;
    editProfile: DialogState;
    editUsername: DialogState;
    logout: DialogState;
    settings: DialogState;
    userInfo: DialogState;
  };
  globalLoading: {
    color: CSSProperties["color"];
    open: boolean;
    progressColor: CSSProperties["color"];
    size: 80;
    speedMultiplier: number;
    type: GlobalLoadingType;
  };
  isOnline: boolean;
  users: Users;
}

export type GlobalSetState = StoreSetFn<GlobalState>;

export type GlobalStore = GlobalHandlers & GlobalState;
