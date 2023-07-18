import { CircularProgressProps } from "@mui/material";
import { CSSProperties } from "react";
import { CountryItem } from "utility-store/lib/types";

import { StoreSetFn, VoidNoArgsFn } from "~/types";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type DialogName =
  | "addContact"
  | "addServer"
  | "advanced"
  | "callSettings"
  | "chatSettings"
  | "contacts"
  | "editBio"
  | "editFullName"
  | "editPhoneNumber"
  | "editProfile"
  | "editProfile"
  | "editUsername"
  | "language"
  | "logout"
  | "notificationsAndSounds"
  | "privacyAndSecurity"
  | "settings"
  | "servers"
  | "userInfo";

export interface DialogProps {
  zIndex: number;
}

export interface DialogState {
  open: boolean;
  props: DialogProps;
}

export type SelectedCountry = CountryItem | null;

export type LoadingType = "FULL_PAGE" | "OVERLAY";

export interface GlobalHandlers {
  openLoading: (type?: LoadingType) => void;
  closeLoading: (type?: LoadingType) => void;
  changeDrawerOpen: (o: boolean) => void;
  // updateDialog: (dialogState: DialogState & { dialogName: DialogName }) => void;
  updateOnlineStatus: (isOnline: boolean) => void;
  openDialog: (dialogName: DialogName, props?: DialogProps) => void;
  closeDialog: (dialogName: DialogName, props?: DialogProps) => void;
  openOverlayLoading: VoidNoArgsFn;
  closeOverlayLoading: VoidNoArgsFn;
  openFullPageLoading: VoidNoArgsFn;
  closeFullPageLoading: VoidNoArgsFn;
}

export interface LoadingState {
  color: "blue";
  open: false;
  progressColor: "inherit";
  size: number;
  speedMultiplier: number;
  type: LoadingType;
}

export interface GlobalState {
  drawer: {
    anchor: DrawerAnchor;
    open: boolean;
  };
  dialogState: {
    addContact: DialogState;
    addServer: DialogState;
    contacts: DialogState;
    editBio: DialogState;
    editFullName: DialogState;
    editProfile: DialogState;
    editUsername: DialogState;
    logout: DialogState;
    servers: DialogState;
    settings: DialogState;
    userInfo: DialogState;
  };
  loading: {
    color: CSSProperties["color"];
    open: boolean;
    progressColor: CircularProgressProps["color"];
    size: 80;
    speedMultiplier: number;
    type: LoadingType;
  };
  isOnline: boolean;
}

export type GlobalSetState = StoreSetFn<GlobalState>;

export type GlobalStore = GlobalHandlers & GlobalState;
