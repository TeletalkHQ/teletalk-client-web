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

export type OnContextMenu = (e: React.MouseEvent) => void;

export interface ContextMenuItem {
  text: string;
  handler: VoidNoArgsFn;
}

export type ContextMenuList = ContextMenuItem[];

export type ContextMenuState = {
  position: {
    mouseX: number;
    mouseY: number;
  } | null;
  list: ContextMenuList;
};

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
  handleContextMenu: (e: React.MouseEvent, list: ContextMenuList) => void;
  closeContextMenu: () => void;
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
  contextMenu: ContextMenuState;
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
  drawer: {
    anchor: DrawerAnchor;
    open: boolean;
  };
  isOnline: boolean;
  loading: {
    color: CSSProperties["color"];
    open: boolean;
    progressColor: CircularProgressProps["color"];
    size: 80;
    speedMultiplier: number;
    type: LoadingType;
  };
}

export type GlobalSetState = StoreSetFn<GlobalState>;

export type GlobalStore = GlobalHandlers & GlobalState;
